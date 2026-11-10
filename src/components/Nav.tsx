import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { links, navItems } from "../data/content";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <a href="#top" className="text-lg font-extrabold tracking-tight text-white">
          sparsh<span className="text-pink">.</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a href={links.email} className="neon-btn ml-2 border-pink px-4 py-1.5 text-pink">
            say hi
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="glass mx-auto mt-3 flex max-w-6xl flex-col !p-2 md:hidden" aria-label="Mobile">
          {[...navItems, { label: "say hi ✉️", href: links.email }].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-xl font-bold text-white hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
