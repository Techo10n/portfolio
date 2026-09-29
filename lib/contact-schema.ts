import { z } from "zod";

/** Shared by the contact form (client validation) and /api/contact (the real check). */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
  email: z.email("Please enter a valid email address.").max(254, "Email is too long."),
  subject: z
    .string()
    .trim()
    .min(2, "Subject must be at least 2 characters.")
    .max(150, "Subject must be at most 150 characters."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must be at most 5000 characters."),
  /** Honeypot: hidden from people, filled in by naive bots. */
  website: z.string().max(500).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
