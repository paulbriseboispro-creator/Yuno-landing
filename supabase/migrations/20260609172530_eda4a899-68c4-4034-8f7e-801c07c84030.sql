
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.demo_leads;
REVOKE INSERT ON public.demo_leads FROM anon;
REVOKE INSERT ON public.demo_leads FROM authenticated;
