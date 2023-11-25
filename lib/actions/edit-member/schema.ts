import { MemberRole } from "@prisma/client";
import { z } from "zod";

export const UpdateMemberSchema = z.object({
  newRole: z.nativeEnum(MemberRole),
});

export type UpdateServerFields = z.infer<typeof UpdateMemberSchema>;
