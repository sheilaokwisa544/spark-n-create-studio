import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Inbox, Mail, Users, Calendar, LogOut, Crown, Loader2, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  adminOverview,
  listBookings,
  updateBooking,
  listMessages,
  updateMessage,
  listSubscribers,
  adminListGallery,
  upsertGalleryImage,
  deleteGalleryImage,
  checkIsAdmin,
  claimFirstAdmin,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — ChoraNami" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Tab = "overview" | "bookings" | "messages" | "subscribers" | "gallery";

function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const checkAdmin = useServerFn(checkIsAdmin);
  const claim = useServerFn(claimFirstAdmin);

  const roleQ = useQuery({ queryKey: ["is-admin"], queryFn: () => checkAdmin() });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (roleQ.isLoading) {
    return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-brand-orange" /></div>;
  }

  if (!roleQ.data?.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-hero-wash p-6">
        <div className="glass-card w-full max-w-md rounded-3xl p-8 text-center shadow-glass">
          <Crown className="mx-auto h-10 w-10 text-brand-orange" />
          <h1 className="mt-3 font-display text-2xl font-black text-brand-brown">Admin access required</h1>
          <p className="mt-2 text-sm text-brand-brown/70">
            Your account isn't an admin yet. If you're the first ChoraNami admin, claim access now.
          </p>
          <button
            type="button"
            onClick={async () => {
              try {
                const r = await claim();
                if (r.ok) { toast.success("You're now an admin!"); roleQ.refetch(); }
                else toast.error(r.reason ?? "Cannot claim");
              } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
            }}
            className="btn-pill mt-5 bg-gradient-button text-white shadow-glow-orange"
          >
            Claim first admin
          </button>
          <button type="button" onClick={signOut} className="mt-3 block w-full text-xs text-brand-brown/60 hover:underline">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-wash">
      <header className="border-b border-white/40 glass-card sticky top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-display text-xl font-black text-brand-brown">ChoraNami · Admin</Link>
          </div>
          <button type="button" onClick={signOut} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-brown shadow-card ring-1 ring-border hover:-translate-y-0.5">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6">
          {([
            ["overview", "Overview", Inbox],
            ["bookings", "Bookings", Calendar],
            ["messages", "Messages", Mail],
            ["subscribers", "Subscribers", Users],
            ["gallery", "Gallery", ImageIcon],
          ] as const).map(([k, label, Icon]) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === k ? "bg-gradient-button text-white shadow-glow-orange" : "text-brand-brown/70 hover:bg-white/60"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {tab === "overview" ? <Overview /> : null}
        {tab === "bookings" ? <BookingsTab /> : null}
        {tab === "messages" ? <MessagesTab /> : null}
        {tab === "subscribers" ? <SubscribersTab /> : null}
        {tab === "gallery" ? <GalleryTab /> : null}
      </main>
    </div>
  );
}

function Overview() {
  const fn = useServerFn(adminOverview);
  const q = useQuery({ queryKey: ["admin-overview"], queryFn: () => fn() });
  if (q.isLoading || !q.data) return <p>Loading…</p>;
  const cards = [
    { label: "New bookings", value: q.data.bookings.newCount, total: q.data.bookings.total, color: "bg-brand-orange" },
    { label: "Unread messages", value: q.data.messages.newCount, total: q.data.messages.total, color: "bg-brand-turquoise" },
    { label: "Subscribers", value: q.data.subscribers, color: "bg-brand-purple" },
    { label: "Upcoming events", value: q.data.upcomingEvents, color: "bg-brand-yellow" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="glass-card rounded-3xl p-6 shadow-glass">
          <div className={`inline-flex h-3 w-3 rounded-full ${c.color}`} />
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-brand-brown/60">{c.label}</p>
          <p className="mt-2 font-display text-4xl font-black text-brand-brown">{c.value}</p>
          {c.total !== undefined ? <p className="text-xs text-brand-brown/60">of {c.total} total</p> : null}
        </div>
      ))}
    </div>
  );
}

function BookingsTab() {
  const list = useServerFn(listBookings);
  const upd = useServerFn(updateBooking);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin-bookings"], queryFn: () => list() });
  const m = useMutation({
    mutationFn: (data: { id: string; status: any; admin_notes?: string | null }) => upd({ data }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-bookings"] }); toast.success("Updated"); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });
  if (q.isLoading || !q.data) return <p>Loading…</p>;
  return (
    <div className="overflow-hidden rounded-3xl glass-card shadow-glass">
      <table className="w-full text-sm">
        <thead className="bg-white/50 text-left text-xs uppercase tracking-wider text-brand-brown/70">
          <tr><th className="p-3">When</th><th className="p-3">Program</th><th className="p-3">Name</th><th className="p-3">Contact</th><th className="p-3">Status</th></tr>
        </thead>
        <tbody>
          {q.data.map((b: any) => (
            <tr key={b.id} className="border-t border-white/30 align-top">
              <td className="p-3 text-xs text-brand-brown/70">{new Date(b.created_at).toLocaleString()}</td>
              <td className="p-3 font-semibold">{b.program_slug ?? "—"}</td>
              <td className="p-3">{b.parent_name}</td>
              <td className="p-3 text-xs">
                <a href={`mailto:${b.email}`} className="block text-brand-orange hover:underline">{b.email}</a>
                <a href={`tel:${b.phone}`} className="block text-brand-brown/70">{b.phone}</a>
              </td>
              <td className="p-3">
                <select
                  value={b.status}
                  onChange={(e) => m.mutate({ id: b.id, status: e.target.value, admin_notes: b.admin_notes })}
                  className="rounded-full border border-input bg-white/70 px-3 py-1.5 text-xs"
                >
                  {["new", "contacted", "confirmed", "completed", "cancelled"].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
          {q.data.length === 0 ? <tr><td colSpan={5} className="p-8 text-center text-brand-brown/60">No bookings yet.</td></tr> : null}
        </tbody>
      </table>
    </div>
  );
}

function MessagesTab() {
  const list = useServerFn(listMessages);
  const upd = useServerFn(updateMessage);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin-messages"], queryFn: () => list() });
  const m = useMutation({
    mutationFn: (data: { id: string; status: any }) => upd({ data }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-messages"] }); },
  });
  if (q.isLoading || !q.data) return <p>Loading…</p>;
  return (
    <div className="grid gap-3">
      {q.data.map((msg: any) => (
        <div key={msg.id} className="glass-card rounded-2xl p-5 shadow-glass">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-brand-brown">{msg.name} <span className="text-xs font-normal text-brand-brown/60">· {msg.email}</span></p>
              <p className="text-xs text-brand-brown/60">{new Date(msg.created_at).toLocaleString()}</p>
            </div>
            <select value={msg.status} onChange={(e) => m.mutate({ id: msg.id, status: e.target.value })} className="rounded-full border border-input bg-white/70 px-3 py-1 text-xs">
              {["new", "read", "replied", "archived"].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {msg.subject ? <p className="mt-2 text-sm font-semibold text-brand-brown">{msg.subject}</p> : null}
          <p className="mt-1 whitespace-pre-wrap text-sm text-brand-brown/80">{msg.message}</p>
        </div>
      ))}
      {q.data.length === 0 ? <p className="p-8 text-center text-brand-brown/60">No messages yet.</p> : null}
    </div>
  );
}

function SubscribersTab() {
  const list = useServerFn(listSubscribers);
  const q = useQuery({ queryKey: ["admin-subs"], queryFn: () => list() });
  if (q.isLoading || !q.data) return <p>Loading…</p>;
  const csv = ["email,subscribed_at", ...q.data.map((s: any) => `${s.email},${s.subscribed_at}`)].join("\n");
  return (
    <div className="glass-card rounded-3xl p-5 shadow-glass">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-semibold text-brand-brown">{q.data.length} subscriber(s)</p>
        <a href={`data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`} download="subscribers.csv" className="btn-pill bg-gradient-button text-white text-sm">Export CSV</a>
      </div>
      <ul className="divide-y divide-white/30 text-sm">
        {q.data.map((s: any) => (
          <li key={s.id} className="flex items-center justify-between py-2">
            <span>{s.email}</span>
            <span className="text-xs text-brand-brown/60">{new Date(s.subscribed_at).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GalleryTab() {
  const list = useServerFn(adminListGallery);
  const upsert = useServerFn(upsertGalleryImage);
  const del = useServerFn(deleteGalleryImage);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin-gallery"], queryFn: () => list() });
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("General");
  const [title, setTitle] = useState("");

  const addM = useMutation({
    mutationFn: () => upsert({ data: { url, category, title: title || null, published: true } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-gallery"] }); setUrl(""); setTitle(""); toast.success("Image added"); },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });
  const delM = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-gallery"] }); toast.success("Deleted"); },
  });

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-3xl p-5 shadow-glass">
        <p className="font-bold text-brand-brown">Add image by URL</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-[2fr_1fr_1fr_auto]">
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" className="rounded-full border border-input bg-white/70 px-4 py-2 text-sm" />
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="rounded-full border border-input bg-white/70 px-4 py-2 text-sm" />
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="rounded-full border border-input bg-white/70 px-4 py-2 text-sm" />
          <button type="button" onClick={() => url && addM.mutate()} disabled={addM.isPending} className="btn-pill bg-gradient-button text-white shadow-glow-orange text-sm">Add</button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(q.data ?? []).map((g: any) => (
          <div key={g.id} className="group relative overflow-hidden rounded-2xl bg-card shadow-card ring-1 ring-border">
            <img src={g.url} alt={g.title ?? ""} className="h-48 w-full object-cover" />
            <div className="p-3">
              <p className="text-sm font-bold text-brand-brown">{g.title ?? "Untitled"}</p>
              <p className="text-xs text-brand-brown/60">{g.category}</p>
            </div>
            <button type="button" onClick={() => delM.mutate(g.id)} className="absolute right-2 top-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-destructive shadow-card opacity-0 transition group-hover:opacity-100">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
