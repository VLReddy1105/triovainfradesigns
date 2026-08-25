"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Field, inputStyles } from "@/components/ui/Field";
import { serviceNames } from "@/data/site";
import { callbackSchema, type CallbackInput } from "@/lib/schema";

type Status = "idle" | "submitting" | "success" | "error";

/** The glassy hero card, ported from the original and wired to /api/contact. */
export function ConsultationCard() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CallbackInput>({
    resolver: zodResolver(callbackSchema),
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Request failed");
      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  });

  const busy = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="consultation-heading"
      className="rounded-panel w-full max-w-sm border border-white/25 bg-white/12 p-7 shadow-[0_25px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
    >
      <h2
        id="consultation-heading"
        className="text-center text-2xl font-bold text-white"
      >
        Book Free Consultation
      </h2>
      <p className="mt-2 text-center text-sm text-white/70">
        We&apos;ll call you back during business hours.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <Field
          id="callback-name"
          label="Your Name"
          tone="dark"
          error={errors.name?.message}
        >
          <input
            id="callback-name"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "callback-name-error" : undefined}
            className={inputStyles.dark}
            {...register("name")}
          />
        </Field>

        <Field
          id="callback-phone"
          label="Phone Number"
          tone="dark"
          error={errors.phone?.message}
        >
          <input
            id="callback-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "callback-phone-error" : undefined}
            className={inputStyles.dark}
            {...register("phone")}
          />
        </Field>

        <Field
          id="callback-service"
          label="Service"
          tone="dark"
          error={errors.service?.message}
        >
          <select
            id="callback-service"
            defaultValue=""
            aria-invalid={Boolean(errors.service)}
            aria-describedby={
              errors.service ? "callback-service-error" : undefined
            }
            className={inputStyles.dark}
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

      <div aria-live="polite">
        {status === "success" ? (
          <p className="mt-4 flex items-start gap-2 rounded-xl text-success-fg bg-white/95 px-3 py-3 text-sm font-medium">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Thanks — we&apos;ll be in touch shortly.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="mt-4 flex items-start gap-2 rounded-xl text-error-fg bg-white/95 px-3 py-3 text-sm font-medium">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Couldn&apos;t send that. Please call us instead.
          </p>
        ) : null}
      </div>

      <Button type="submit" size="lg" disabled={busy} className="mt-6 w-full">
        {busy ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Request Callback"
        )}
      </Button>
    </form>
  );
}
