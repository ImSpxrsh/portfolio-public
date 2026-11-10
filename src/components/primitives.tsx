import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Pops in with a little bounce when scrolled into view. */
export function Pop({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "40px" }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({
  kicker,
  children,
  id,
}: {
  kicker: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Pop className="mb-10 text-center sm:mb-14">
      <p className="font-hand text-2xl text-ink/70 sm:text-3xl">{kicker}</p>
      <h2
        id={id}
        className="mt-1 text-[clamp(2.4rem,7vw,4.5rem)] font-extrabold leading-none tracking-tight"
      >
        {children}
      </h2>
    </Pop>
  );
}
