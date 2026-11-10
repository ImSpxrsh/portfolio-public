import { Github, Linkedin, Mail } from "lucide-react";
import { Pop } from "./primitives";
import { links } from "../data/content";

export function Footer() {
  return (
    <footer className="px-5 pb-10 pt-16">
      <Pop className="mx-auto max-w-3xl">
        <div className="sticker rotate-[0.6deg] bg-yellow p-8 text-center sm:p-12">
          <p className="text-5xl">💌</p>
          <h2 className="mt-3 text-[clamp(2rem,6vw,3.5rem)] font-extrabold leading-none">
            wanna build something?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg">
            Ideas, questions, or just want to say hi. My inbox is open.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={links.email} className="btn bg-pink">
              <Mail className="h-5 w-5" /> {links.emailPlain}
            </a>
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn bg-white" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn bg-white" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </Pop>

      <p className="mt-10 text-center font-hand text-xl text-ink/60">
        made with too many snacks · © {new Date().getFullYear()} Sparsh Roy
      </p>
    </footer>
  );
}
