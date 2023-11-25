import { Server, Member, Profile, Channel } from "@prisma/client";

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type ServerWithMembersWithProfilesAndChannels = Server & {
  members: (Member & { profile: Profile })[];
  channels: Channel[];
};
