import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  // A 404 must not be indexed, nor claim the home page as its canonical.
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center py-32 text-center">
      <p className="text-gold-text text-6xl font-extrabold sm:text-7xl">404</p>
      <h1 className="text-ink mt-6 text-2xl font-bold sm:text-3xl">
        This page doesn&apos;t exist
      </h1>
      <p className="text-body mt-4 max-w-md text-base">
        The page you were looking for may have moved. Head back to the home page
        or browse our services.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <ButtonLink href="/">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Home
        </ButtonLink>
        <ButtonLink href="/services" variant="secondary">
          View Services
        </ButtonLink>
      </div>
    </Container>
  );
}
