import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Sparkles, Loader2, Mail, Lock, LogIn } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { PageHero } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In — ChoraNami" },
      { name: "description", content: "Sign in to ChoraNami." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/auth" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created! Check your email if confirmation is required.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: "/admin" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPending(false);
    }
  }

  async function handleGoogle() {
    setPending(true);
    try {
      await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
      setPending(false);
    }
  }

  return (
    <SiteLayout transparentHeader>
      <PageHero
        kicker="Team Access"
        title={<><span className="text-gradient-splash">Sign in</span> to ChoraNami</>}
        subtitle="For staff and administrators."
        accent="turquoise"
      />
      <section className="mx-auto max-w-md px-4 py-10 sm:px-6">
        <div className="glass-card rounded-3xl p-8 shadow-glass">
          <div className="flex rounded-full bg-white/60 p-1">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-bold transition ${
                  mode === m ? "bg-gradient-button text-white shadow-glow-orange" : "text-brand-brown/70"
                }`}
              >
                {m === "signin" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={pending}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-brown shadow-card ring-1 ring-border hover:-translate-y-0.5 transition disabled:opacity-70"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3 text-xs text-brand-brown/50">
            <div className="h-px flex-1 bg-brand-brown/15" /> OR <div className="h-px flex-1 bg-brand-brown/15" />
          </div>

          <form onSubmit={handleEmail} className="space-y-4">
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-brown/50" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-full border border-input bg-white/70 pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-brown/50" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-full border border-input bg-white/70 pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className="btn-pill w-full bg-gradient-button text-white shadow-glow-orange disabled:opacity-70"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-brand-brown/60">
            <Sparkles className="mr-1 inline h-3 w-3 text-brand-orange" />
            <Link to="/" className="hover:underline">Back to site</Link>
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
