"use server";

import { MemberRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { CreateServerFields } from "./schema";
import { db } from "@/lib/db";

export async function createServer(data: CreateServerFields) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = data;

    if (!profile) {
      return { message: "Unauthorized" };
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    revalidatePath(`/`);
    return { data: server };
  } catch (error) {
    return { message: "Internal Error" };
  }
}
