-- Table for lead magnet form submissions
CREATE TABLE IF NOT EXISTS public.lead_magnet_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  guide_slug text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text
);

-- Index for quick filtering by guide and creation date
CREATE INDEX IF NOT EXISTS lead_magnet_leads_slug_created_idx
  ON public.lead_magnet_leads (guide_slug, created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.lead_magnet_leads ENABLE ROW LEVEL SECURITY;

-- Allow INSERT only for public/anon and authenticated callers (no public SELECT/UPDATE/DELETE)
CREATE POLICY "Allow insert only for lead_magnet_leads"
  ON public.lead_magnet_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
