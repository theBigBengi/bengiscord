"use server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function leaveServer(serverId: string) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return { message: "Unauthorized" };
    }

    if (!serverId) {
      return { message: "Server id is missing" };
    }

    await db.server.update({
      where: {
        id: serverId,
        profileId: {
          not: profile.id,
        },
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
  } catch (error) {
    return { message: "Internal Error" };
  }
}
