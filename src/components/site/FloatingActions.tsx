import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {show ? (
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-card text-foreground shadow-card ring-1 ring-border hover:scale-110 transition"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      ) : null}
      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full text-white shadow-splash hover:scale-110 transition animate-float-slow"
        style={{ backgroundColor: "#25D366" }}
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
