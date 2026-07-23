import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";

export function SiteLayout({ children, transparentHeader = false }: { children: ReactNode; transparentHeader?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className={transparentHeader ? "flex-1" : "flex-1 pt-20"}>{children}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

