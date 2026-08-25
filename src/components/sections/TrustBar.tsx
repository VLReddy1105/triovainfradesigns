"use client";

import { Icon } from "@/components/ui/Icon";
import { useCountUp } from "@/hooks/useCountUp";
import { stats } from "@/data/stats";
import type { Stat } from "@/types";

function StatValue({ stat }: { stat: Stat }) {
  const { ref, value } = useCountUp(stat.value ?? 0);

  if (stat.value === undefined) {
    return (
      <span className="text-gold-text block text-4xl font-bold sm:text-5xl">
        {stat.display}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className="text-gold-text block text-4xl font-bold tabular-nums sm:text-5xl"
    >
      {value}
      {stat.suffix}
    </span>
  );
}

export function TrustBar() {
  return (
    <section
      aria-label="Triova by the numbers"
      className="border-gold/35 gutter border-y bg-white py-14"
    >
      <ul className="mx-auto grid max-w-[81.25rem] grid-cols-2 gap-10 lg:grid-cols-4">
        {stats.map((stat) => (
          <li key={stat.label} className="text-center">
            <Icon
              name={stat.icon}
              className="text-gold mx-auto mb-4 size-9"
            />
            <StatValue stat={stat} />
            <p className="text-body mt-2 text-sm font-medium sm:text-base">
              {stat.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
