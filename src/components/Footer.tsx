import { Github, Linkedin, Mail } from "lucide-react";
import { links } from "../data/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#D7E2EA]/10 bg-[#0C0C0C] px-5 py-12 sm:px-8 md:px-10">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#D7E2EA]">
            Sparsh Roy
          </p>
          <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-[#D7E2EA]/55">
            Researcher and builder across AI/ML, health, and systems. Publications
            and coursework are maintained on my MIT site.
          </p>
          <div className="mt-5 flex items-center gap-5">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-full text-[#D7E2EA]/55 transition duration-200 hover:text-[#D7E2EA]"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-full text-[#D7E2EA]/55 transition duration-200 hover:text-[#D7E2EA]"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={links.email}
              className="focus-ring rounded-full text-[#D7E2EA]/55 transition duration-200 hover:text-[#D7E2EA]"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#D7E2EA]/45">
            Elsewhere
          </p>
          <ul className="mt-4 grid gap-2.5">
            {[
              { label: "Publications", href: links.publications },
              { label: "Courses", href: links.courses },
              { label: "Blog", href: links.blog },
              { label: "MIT site", href: links.mitSite },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring rounded text-sm font-light text-[#D7E2EA]/65 transition duration-200 hover:text-[#D7E2EA]"
                >
                  {item.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-10 max-w-5xl border-t border-[#D7E2EA]/10 pt-6">
        <p className="text-xs font-light text-[#D7E2EA]/45">
          &copy; {year} Sparsh Roy. All rights reserved.
        </p>
        <p className="mt-3 text-[0.7rem] font-light leading-relaxed text-[#D7E2EA]/35">
          The content, design, and source code of this site are the intellectual
          property of Sparsh Roy and are protected under copyright law. No part may
          be reproduced, distributed, or reused without prior written permission.
        </p>
      </div>
    </footer>
  );
}
