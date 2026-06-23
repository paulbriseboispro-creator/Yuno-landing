-- Lead submissions are performed by the server with service_role (which bypasses RLS),
-- so anon/authenticated do not need direct table access.
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.demo_leads;
REVOKE INSERT ON public.demo_leads FROM anon, authenticated;
GRANT ALL ON public.demo_leads TO service_role;
