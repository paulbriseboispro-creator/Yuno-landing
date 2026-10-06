import { useEffect, useState } from "react";

// Phones get their own layout for the visuals that only make sense wide (a
// 1440 px Console scaled down, a 760 px funnel): `useIsPhone()` mounts one or
// the other. `null` until mounted (server HTML), so callers keep the texts in
// the markup and only gate the visuals.
export const PHONE_QUERY = "(max-width: 639px)";

export function useMedia(query: string) {
  const [v, setV] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setV(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return v;
}

export function useIsPhone() {
  return useMedia(PHONE_QUERY);
}
