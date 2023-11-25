"use server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function deleteServer(serverId: string) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return { message: "Unauthorized" };
    }

    await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id,
      },
    });
  } catch (error) {
    return { message: "Internal Error" };
  }
}
