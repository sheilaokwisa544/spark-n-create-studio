// Admin server functions. Requires signed-in user with admin role.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

export const adminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const sb = context.supabase;
    const [bookings, messages, subs, events] = await Promise.all([
      sb.from("bookings").select("id,status", { count: "exact", head: false }),
      sb.from("contact_messages").select("id,status", { count: "exact", head: false }),
      sb.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
      sb.from("events").select("id", { count: "exact", head: true }).gte("starts_at", new Date().toISOString()),
    ]);
    const bookingRows = bookings.data ?? [];
    const messageRows = messages.data ?? [];
    return {
      bookings: {
        total: bookingRows.length,
        newCount: bookingRows.filter((r: any) => r.status === "new").length,
      },
      messages: {
        total: messageRows.length,
        newCount: messageRows.filter((r: any) => r.status === "new").length,
      },
      subscribers: subs.count ?? 0,
      upcomingEvents: events.count ?? 0,
    };
  });

export const listBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

const updateBookingInput = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "confirmed", "completed", "cancelled"]),
  admin_notes: z.string().max(2000).optional().nullable(),
});
export const updateBooking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => updateBookingInput.parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from("bookings")
      .update({ status: data.status, admin_notes: data.admin_notes ?? null })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

const updateMessageInput = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "read", "replied", "archived"]),
});
export const updateMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => updateMessageInput.parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from("contact_messages")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listSubscribers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("subscribed_at", { ascending: false })
      .limit(2000);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

// Gallery admin
const galleryInput = z.object({
  id: z.string().uuid().optional(),
  url: z.string().url(),
  title: z.string().max(200).optional().nullable(),
  caption: z.string().max(500).optional().nullable(),
  category: z.string().max(50),
  sort_order: z.number().int().optional(),
  published: z.boolean().optional(),
});
export const upsertGalleryImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => galleryInput.parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    if (data.id) {
      const { error } = await context.supabase
        .from("gallery_images")
        .update({
          url: data.url,
          title: data.title ?? null,
          caption: data.caption ?? null,
          category: data.category,
          sort_order: data.sort_order ?? 0,
          published: data.published ?? true,
        })
        .eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await context.supabase.from("gallery_images").insert({
        url: data.url,
        title: data.title ?? null,
        caption: data.caption ?? null,
        category: data.category,
        sort_order: data.sort_order ?? 0,
        published: data.published ?? true,
      });
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

const deleteInput = z.object({ id: z.string().uuid() });
export const deleteGalleryImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => deleteInput.parse(d))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("gallery_images").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminListGallery = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

// Check if current user is admin (for auth gate)
export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    return { isAdmin: Boolean(data), userId: context.userId };
  });

// Bootstrap: grants admin role to the current user if there are no admins yet.
// Safe because it's callable only by an authenticated user, and only takes effect on empty user_roles admin set.
export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error: countErr } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (countErr) throw new Error(countErr.message);
    if ((count ?? 0) > 0) return { ok: false, reason: "Admin already exists" };
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
