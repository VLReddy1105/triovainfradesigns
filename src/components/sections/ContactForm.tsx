"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Field, inputStyles } from "@/components/ui/Field";
import { serviceNames } from "@/data/site";
import { contactSchema, type ContactInput } from "@/lib/schema";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data: unknown = await response.json().catch(() => null);
        const message =
          typeof data === "object" && data !== null && "error" in data
            ? String((data as { error: unknown }).error)
            : "Something went wrong. Please try again.";
        throw new Error(message);
      }

      reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    }
  });

  const busy = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-panel shadow-card flex flex-col gap-5 bg-white p-6 sm:p-9"
    >
      {/* Honeypot — hidden from users, catches naive bots. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your Name" error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputStyles.light}
            {...register("name")}
          />
        </Field>

        <Field id="phone" label="Phone Number" error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputStyles.light}
            {...register("phone")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email Address" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputStyles.light}
            {...register("email")}
          />
        </Field>

        <Field id="service" label="Service Required" error={errors.service?.message}>
          <select
            id="service"
            defaultValue=""
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
            className={inputStyles.light}
            {...register("service")}
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Project Details" error={errors.message?.message}>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your project — property type, size, timeline and budget range."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputStyles.light}
          {...register("message")}
        />
      </Field>

      <div aria-live="polite" className="min-h-0">
        {status === "success" ? (
          <p className="flex items-start gap-3 rounded-2xl bg-success-bg text-success-fg px-4 py-3.5 text-sm font-medium">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            Thank you — your enquiry has been received. Our team will call you
            back during business hours.
          </p>
        ) : null}

        {status === "error" ? (
          <p className="flex items-start gap-3 rounded-2xl bg-error-bg text-error-fg px-4 py-3.5 text-sm font-medium">
            <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            {errorMessage}
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" disabled={busy} className="self-start">
        {busy ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send Enquiry
            <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}
