// Public submissions: booking, contact, newsletter. Uses publishable-key server client
// so the row-level "public insert" policies apply.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getPublicSupabase } from "./supabase-server";

const bookingInput = z.object({
  program_slug: z.string().max(80).optional().nullable(),
  event_id: z.string().uuid().optional().nullable(),
  parent_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(30),
  child_age: z.string().max(30).optional().nullable(),
  participants: z.number().int().min(1).max(5000).optional().nullable(),
  preferred_date: z.string().optional().nullable(),
  message: z.string().max(1500).optional().nullable(),
});

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => bookingInput.parse(d))
  .handler(async ({ data }) => {
    const sb = getPublicSupabase();
    const { error } = await sb.from("bookings").insert({
      program_slug: data.program_slug ?? null,
      event_id: data.event_id ?? null,
      parent_name: data.parent_name,
      email: data.email,
      phone: data.phone,
      child_age: data.child_age ?? null,
      participants: data.participants ?? null,
      preferred_date: data.preferred_date || null,
      message: data.message ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const contactInput = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().nullable(),
  subject: z.string().trim().max(200).optional().nullable(),
  message: z.string().trim().min(5).max(2000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => contactInput.parse(d))
  .handler(async ({ data }) => {
    const sb = getPublicSupabase();
    const { error } = await sb.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      subject: data.subject ?? null,
      message: data.message,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const newsletterInput = z.object({
  email: z.string().trim().email().max(255),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => newsletterInput.parse(d))
  .handler(async ({ data }) => {
    const sb = getPublicSupabase();
    const { error } = await sb
      .from("newsletter_subscribers")
      .insert({ email: data.email.toLowerCase() });
    if (error && !/duplicate key/i.test(error.message)) throw new Error(error.message);
    return { ok: true };
  });
