-- Explicit deny: makes the "RLS enabled, no policy" linter happy and documents
-- that no public role can read or write this table. service_role bypasses RLS.
CREATE POLICY "Deny all public access to demo_leads"
ON public.demo_leads
AS RESTRICTIVE
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);
