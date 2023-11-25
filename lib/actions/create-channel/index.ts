"use server";

import { revalidatePath } from "next/cache";

import { currentProfile } from "@/lib/current-profile";
import { CreateChannelFields } from "./schema";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function createChannel(
  serverId: string,
  data: CreateChannelFields
) {
  try {
    const profile = await currentProfile();
    const { name, type } = data;

    if (!profile) {
      return { message: "Unauthorized" };
    }

    if (!serverId) {
      return { nessage: "Server ID missing" };
    }

    if (name === "general") {
      return { message: "Name cannot be 'general'" };
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });

    revalidatePath(`/`);
    return { data: server };
  } catch (error) {
    return { message: "Internal Error" };
  }
}
