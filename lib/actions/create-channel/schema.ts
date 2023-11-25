import { ChannelType } from "@prisma/client";
import { z } from "zod";

export const CreateChannelSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required.",
    })
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'general'",
    }),
  type: z.nativeEnum(ChannelType),
});

export type CreateChannelFields = z.infer<typeof CreateChannelSchema>;
