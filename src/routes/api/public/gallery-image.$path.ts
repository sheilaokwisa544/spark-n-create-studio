import { createFileRoute } from "@tanstack/react-router";

// Public read proxy for the private "gallery" storage bucket.
// Only serves objects from that bucket; nothing else is exposed.
export const Route = createFileRoute("/api/public/gallery-image/$path")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = decodeURIComponent(params.path ?? "");
        if (!path || path.includes("..") || path.startsWith("/")) {
          return new Response("Bad request", { status: 400 });
        }
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from("gallery").download(path);
        if (error || !data) return new Response("Not found", { status: 404 });
        return new Response(await data.arrayBuffer(), {
          headers: {
            "content-type": data.type || "image/jpeg",
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
