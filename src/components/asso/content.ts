import { assoContent, type AssoContent } from "@/content/asso";
import { useLanding } from "@/components/landing/context";

// The association page's copy, in the language of the surrounding LandingProvider.
export function useAsso(): AssoContent {
  return assoContent[useLanding().lang];
}
