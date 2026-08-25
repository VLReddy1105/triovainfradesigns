"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
  /** Id of the toggle button, so the drawer can point back at it. */
  labelledBy: string;
}

export function MobileNav({ open, onClose, pathname, labelledBy }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useLockBodyScroll(open);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            aria-hidden="true"
          />

          <motion.div
            key="panel"
            ref={panelRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-navy fixed top-0 right-0 z-50 flex h-dvh w-[86%] max-w-sm flex-col overflow-y-auto px-7 pt-6 pb-10 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-gold text-sm font-semibold tracking-[0.2em] uppercase">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-full p-2 text-white transition hover:bg-white/10"
              >
                <X className="size-6" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-8 flex-1">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-lg font-semibold transition",
                        isActive(link.href)
                          ? "bg-gold text-navy"
                          : "text-white hover:bg-white/10",
                      )}
                    >
                      {link.label}
                    </Link>

                    {link.children ? (
                      <ul className="border-gold/30 mt-1 mb-2 ml-4 flex flex-col gap-1 border-l pl-3">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
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

            <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-6">
              {site.phones.map((phone) => (
                <a
                  key={phone.raw}
                  href={`tel:${phone.raw}`}
                  className="text-gold flex items-center gap-3 text-sm font-medium"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {phone.display}
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-sm break-all text-white/80"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {site.email}
              </a>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
