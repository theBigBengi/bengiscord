"use server";

import { revalidatePath } from "next/cache";

import { currentProfile } from "@/lib/current-profile";
import { UpdateServerFields } from "./schema";
import { db } from "@/lib/db";

export async function updateServer(serverId: string, data: UpdateServerFields) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return { message: "Unauthorized" };
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        ...data,
      },
    });

    revalidatePath(`/`);
    return { data: server };
  } catch (error) {
    return { message: "Internal Error" };
  }
}
