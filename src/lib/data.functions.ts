// Public data fetchers (read published rows through the server publishable client).
import { createServerFn } from "@tanstack/react-start";
import { getPublicSupabase } from "./supabase-server";

export const listPrograms = createServerFn({ method: "GET" }).handler(async () => {
  const sb = getPublicSupabase();
  const { data, error } = await sb
    .from("programs")
    .select("slug,title,short,description,features,cta,icon,color,sort_order")
    .eq("published", true)
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const listEvents = createServerFn({ method: "GET" }).handler(async () => {
  const sb = getPublicSupabase();
  const { data, error } = await sb
    .from("events")
    .select("id,slug,title,description,cover_url,starts_at,ends_at,location,capacity,price_text,status,featured")
    .eq("published", true)
    .order("starts_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const listGallery = createServerFn({ method: "GET" }).handler(async () => {
  const sb = getPublicSupabase();
  const { data, error } = await sb
    .from("gallery_images")
    .select("id,url,title,caption,category,width,height,sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const listTestimonials = createServerFn({ method: "GET" }).handler(async () => {
  const sb = getPublicSupabase();
  const { data, error } = await sb
    .from("testimonials")
    .select("id,name,role,quote,avatar_url,rating,featured,sort_order")
    .eq("published", true)
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const listFaqs = createServerFn({ method: "GET" }).handler(async () => {
  const sb = getPublicSupabase();
  const { data, error } = await sb
    .from("faqs")
    .select("id,category,question,answer,sort_order")
    .eq("published", true)
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});
