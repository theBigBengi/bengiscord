import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params: { serverId } }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        profileId: profile.id,
        id: serverId,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
