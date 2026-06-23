-- Ensure RLS is on
ALTER TABLE public.demo_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous + authenticated visitors to submit a lead via the public form
-- (admin server code uses service_role which bypasses RLS).
GRANT INSERT ON public.demo_leads TO anon, authenticated;
GRANT ALL ON public.demo_leads TO service_role;

DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.demo_leads;
CREATE POLICY "Anyone can submit a lead"
ON public.demo_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies are defined on purpose: only service_role
-- (used by admin server functions) may read or modify lead data.
