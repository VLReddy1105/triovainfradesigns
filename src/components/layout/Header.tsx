"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { navLinks, primaryPhone, site } from "@/data/site";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";

const TOGGLE_ID = "mobile-nav-toggle";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled, hidden } = useScrollDirection();
  const pathname = usePathname();

  // Close the drawer whenever navigation completes, including on browser
  // back/forward. Adjusting state during render avoids a second paint.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setMenuOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="focus:bg-gold focus:text-navy sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:px-5 focus:py-3 focus:font-semibold"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "ease-out-soft fixed inset-x-0 top-0 z-50 transition-all duration-400",
          scrolled
            ? "bg-navy/95 shadow-panel backdrop-blur-md"
            : "bg-gradient-to-b from-black/75 via-black/35 to-transparent",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <div className="gutter mx-auto flex max-w-[81.25rem] items-center justify-between gap-6 py-3">
          <Link
            href="/"
            className="shrink-0"
            aria-label={`${site.name} — home`}
          >
            <Logo size={scrolled ? "sm" : "md"} priority />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-1 py-2 text-[0.95rem] font-medium transition-colors",
                      isActive(link.href)
                        ? "text-gold"
                        : "text-white hover:text-gold",
                    )}
                  >
                    {link.label}
                    {link.children ? (
                      <ChevronDown
                        className="size-4 transition-transform group-hover:rotate-180"
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>

                  {link.children ? (
                    <ul className="shadow-panel invisible absolute top-full left-0 w-64 rounded-2xl bg-white p-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="text-ink hover:bg-surface hover:text-navy-bright block rounded-xl px-4 py-3 text-sm font-medium transition"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${primaryPhone.raw}`}
              className="rounded-pill bg-gold text-navy hover:bg-gold-deep hidden items-center gap-2 px-5 py-2.5 text-sm font-semibold transition lg:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              {primaryPhone.display}
            </a>

            <button
              type="button"
              id={TOGGLE_ID}
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label="Open menu"
              className="text-gold rounded-lg p-2 transition hover:bg-white/10 lg:hidden"
            >
              <Menu className="size-7" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
        labelledBy={TOGGLE_ID}
      />
    </>
  );
}
