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
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-3 sm:px-6">
      <div className="sticker mx-auto flex max-w-5xl items-center justify-between gap-4 bg-paper/95 px-4 py-2 backdrop-blur">
        <a href="#top" className="text-lg font-extrabold tracking-tight">
          sparsh<span className="text-pink">.</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 font-semibold transition hover:-rotate-2 hover:bg-yellow"
            >
              {item.label}
            </a>
          ))}
          <a href={links.email} className="btn ml-2 bg-pink px-4 py-1.5">
            say hi ✉️
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="sticker flex h-10 w-10 items-center justify-center bg-yellow md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          className="sticker mx-auto mt-2 flex max-w-5xl flex-col bg-paper p-2 md:hidden"
          aria-label="Mobile"
        >
          {[...navItems, { label: "say hi ✉️", href: links.email }].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-xl font-bold hover:bg-yellow"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
