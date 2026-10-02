import { crmContent, type CrmContent } from "@/content/crm";
import { useLanding } from "@/components/landing/context";

// The Yuno CRM page's copy, in the language of the surrounding LandingProvider.
export function useCrm(): CrmContent {
  return crmContent[useLanding().lang];
}
