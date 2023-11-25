import { z } from "zod";

export const UpdateServerSchema = z.object({
  name: z.optional(
    z.string().min(1, {
      message: "Server name is required.",
    })
  ),
  imageUrl: z.optional(
    z.string().min(1, {
      message: "Server image is required.",
    })
  ),
});

export type UpdateServerFields = z.infer<typeof UpdateServerSchema>;
