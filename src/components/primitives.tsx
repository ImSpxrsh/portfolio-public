import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

/* --------------------------------- FadeIn --------------------------------- */

type FadeInProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

export function FadeIn<T extends ElementType = "div">({
  as,
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  ...props
}: FadeInProps<T>) {
  const shouldReduceMotion = useReducedMotion();
  const MotionElement = useMemo(
    () => motion.create((as ?? "div") as ElementType),
    [as],
  );

  return (
    <MotionElement
      initial={shouldReduceMotion ? false : { opacity: 0, x, y }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      transition={
        shouldReduceMotion
          ? undefined
          : { duration, delay, ease: [0.25, 0.1, 0.25, 1] }
      }
      viewport={{ once: true, margin: "50px", amount: 0 }}
      {...props}
    >
      {children}
    </MotionElement>
  );
}

/* --------------------------------- Magnet --------------------------------- */

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  className = "",
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let frame = 0;
    const handleMouseMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const element = ref.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const withinBounds =
          event.clientX >= rect.left - padding &&
          event.clientX <= rect.right + padding &&
          event.clientY >= rect.top - padding &&
          event.clientY <= rect.bottom + padding;

        if (!withinBounds) {
          setIsActive(false);
          setPosition({ x: 0, y: 0 });
          return;
        }

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setIsActive(true);
        setPosition({
          x: (event.clientX - centerX) / strength,
          y: (event.clientY - centerY) / strength,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [padding, shouldReduceMotion, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: shouldReduceMotion
          ? undefined
          : `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: shouldReduceMotion
          ? undefined
          : isActive
            ? "transform 0.3s ease-out"
            : "transform 0.6s ease-in-out",
        willChange: shouldReduceMotion ? undefined : "transform",
      }}
    >
      {children}
    </div>
  );
}

/* --------------------------------- Buttons -------------------------------- */

export function PrimaryButton({
  href,
  children,
  download,
  external,
}: {
  href: string;
  children: ReactNode;
  download?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white transition duration-200 hover:scale-[1.02] focus-ring sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
    >
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export function ContactButton() {
  return <PrimaryButton href="mailto:sparshr@mit.edu">Contact Me</PrimaryButton>;
}

export function ResourceLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D7E2EA]/30 bg-[#D7E2EA]/5 px-4 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition duration-200 hover:border-[#D7E2EA]/70 hover:bg-[#D7E2EA]/10 sm:h-12 sm:px-5"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

export function VisitButton({ href, label = "Visit" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

/* ------------------------------ Section header ----------------------------- */

export function SectionHeading({
  title,
  eyebrow,
  blurb,
  light = false,
}: {
  title: string;
  eyebrow?: string;
  blurb?: string;
  light?: boolean;
}) {
  return (
    <FadeIn>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          {eyebrow && (
            <p
              className={`mb-4 text-xs font-medium uppercase tracking-[0.24em] ${
                light ? "text-[#0C0C0C]/45" : "text-[#D7E2EA]/45"
              }`}
            >
              {eyebrow}
            </p>
          )}
          <h2
            className={`${
              light ? "" : "hero-heading"
            } text-[clamp(3rem,11vw,140px)] font-black uppercase leading-none tracking-tight`}
          >
            {title}
          </h2>
        </div>
        {blurb && (
          <p
            className={`max-w-xl text-[clamp(0.95rem,1.5vw,1.2rem)] font-light leading-relaxed ${
              light ? "text-[#0C0C0C]/60" : "text-[#D7E2EA]/70"
            }`}
          >
            {blurb}
          </p>
        )}
      </div>
    </FadeIn>
  );
}
