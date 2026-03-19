-- ══════════════════════════════════════════
--  CoBuild Solutions — Supabase Schema
--  Run in: Supabase Dashboard → SQL Editor
-- ══════════════════════════════════════════

CREATE TABLE IF NOT EXISTS profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name   TEXT,
  role        TEXT CHECK (role IN ('Startup_Admin', 'Contributor')) NOT NULL,
  avatar_url  TEXT,
  bio         TEXT,
  skills      TEXT[],
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS startups (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id    UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name        TEXT NOT NULL,
  tagline     TEXT,
  description TEXT,
  stage       TEXT CHECK (stage IN ('Pre-Seed','Seed','Series A','Series B+')) DEFAULT 'Pre-Seed',
  logo_url    TEXT,
  website     TEXT,
  tags        TEXT[],
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS job_postings (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  startup_id      UUID REFERENCES startups(id) ON DELETE CASCADE NOT NULL,
  title           TEXT NOT NULL,
  description     TEXT,
  skills_required TEXT[],
  commitment      TEXT CHECK (commitment IN ('Full-time','Part-time','Contract','Advisor')) DEFAULT 'Full-time',
  equity_offered  TEXT,
  is_paid         BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'Contributor')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- RLS
ALTER TABLE profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE startups    ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read profiles"   ON profiles     FOR SELECT USING (true);
CREATE POLICY "Own update profile"     ON profiles     FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Public read startups"   ON startups     FOR SELECT USING (true);
CREATE POLICY "Admin insert startup"   ON startups     FOR INSERT WITH CHECK (auth.uid() = admin_id);
CREATE POLICY "Admin update startup"   ON startups     FOR UPDATE USING (auth.uid() = admin_id);
CREATE POLICY "Public read jobs"       ON job_postings FOR SELECT USING (true);
CREATE POLICY "Admin manage jobs"      ON job_postings FOR ALL
  USING (startup_id IN (SELECT id FROM startups WHERE admin_id = auth.uid()));
