import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, links } from "../data/content";

export function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #EC4899, #F97316)",
      }}
      aria-hidden="true"
    />
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navItems.map((item) => item.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-[#D7E2EA]/10 bg-[#0C0C0C]/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-6 px-5 py-4 sm:px-8 md:px-10">
          <a
            href="#top"
            className="focus-ring rounded-full text-sm font-black uppercase tracking-[0.2em] text-[#D7E2EA] transition-opacity hover:opacity-70"
          >
            Sparsh Roy
          </a>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={`focus-ring rounded-full px-3.5 py-2 text-xs font-medium uppercase tracking-wider transition duration-200 ${
                  active === item.href
                    ? "bg-[#D7E2EA]/10 text-white"
                    : "text-[#D7E2EA]/65 hover:text-[#D7E2EA]"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={links.email}
              className="focus-ring ml-2 rounded-full border border-[#D7E2EA]/30 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#D7E2EA] transition duration-200 hover:border-[#D7E2EA]/70 hover:bg-[#D7E2EA]/10"
            >
              Contact
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA] lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-[#0C0C0C]/97 pt-20 backdrop-blur-xl lg:hidden">
          <nav
            className="flex flex-col gap-1 px-6"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="focus-ring border-b border-[#D7E2EA]/10 py-5 text-2xl font-black uppercase tracking-tight text-[#D7E2EA]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={links.publications}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="focus-ring border-b border-[#D7E2EA]/10 py-5 text-2xl font-black uppercase tracking-tight text-[#D7E2EA]/70"
            >
              Publications ↗
            </a>
            <a
              href={links.email}
              onClick={() => setOpen(false)}
              className="focus-ring py-5 text-2xl font-black uppercase tracking-tight text-[#D7E2EA]/70"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
