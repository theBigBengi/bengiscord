"use server";

import { revalidatePath } from "next/cache";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function deleteMember(serverId: string, memberId: string) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return { message: "Unauthorized" };
    }

    if (!memberId) {
      return { message: "Member ID missing" };
    }

    if (!serverId) {
      return { message: "Server ID missing" };
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    revalidatePath(`/servers/${serverId}`);
    return { data: server };
  } catch (error) {
    return { message: "Internal Error" };
  }
}
