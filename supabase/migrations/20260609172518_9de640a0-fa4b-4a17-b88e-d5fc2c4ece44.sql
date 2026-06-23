
CREATE TABLE public.demo_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  segment TEXT NOT NULL CHECK (segment IN ('club','organizer','affiliate','other')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  phone TEXT,
  message TEXT,
  source TEXT
);

GRANT INSERT ON public.demo_leads TO anon;
GRANT INSERT ON public.demo_leads TO authenticated;
GRANT ALL ON public.demo_leads TO service_role;

ALTER TABLE public.demo_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON public.demo_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
