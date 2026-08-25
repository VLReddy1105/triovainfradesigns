import { z } from "zod";
import { serviceNames } from "@/data/site";

/** Indian mobile numbers, optionally prefixed with +91 / 0 and loosely spaced. */
const phonePattern = /^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "That name is too long"),
  phone: z
    .string()
    .trim()
    .regex(phonePattern, "Enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(120, "That email is too long"),
  service: z.enum(serviceNames, {
    message: "Please choose a service",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters")
    .max(2000, "Please keep your message under 2000 characters"),
  /**
   * Honeypot: real users never fill this in. It deliberately has no length
   * constraint — the route handler accepts a filled honeypot silently so bots
   * get no signal that they were caught.
   */
  company: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** The hero card asks for less, so it gets its own narrower schema. */
export const callbackSchema = contactSchema.pick({
  name: true,
  phone: true,
  service: true,
});

export type CallbackInput = z.infer<typeof callbackSchema>;
