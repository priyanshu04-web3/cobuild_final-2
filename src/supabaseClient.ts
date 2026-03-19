import { createClient } from "@supabase/supabase-js";

/* ─────────────────────────────────────────────
   Replace these with your Supabase project values.
   Dashboard → Project Settings → API
───────────────────────────────────────────── */
const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL  ?? "https://YOUR_PROJECT.supabase.co";
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON ?? "YOUR_ANON_KEY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

/* ─────────────────────────────────────────────
   TYPE HELPERS
───────────────────────────────────────────── */
export type UserRole = "Startup_Admin" | "Individual_Contributor";

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  bio?: string;
  skills?: string[];
  created_at: string;
}

export interface Startup {
  id: string;
  admin_id: string;
  name: string;
  tagline: string;
  description: string;
  stage: "Pre-Seed" | "Seed" | "Series A" | "Series B+";
  logo_url?: string;
  website?: string;
  tags: string[];
  created_at: string;
}

export interface JobPosting {
  id: string;
  startup_id: string;
  title: string;
  description: string;
  skills_required: string[];
  commitment: "Full-time" | "Part-time" | "Contract" | "Advisor";
  equity_offered: string;
  is_paid: boolean;
  created_at: string;
}

/* ─────────────────────────────────────────────
   RLS-AWARE DATA HELPERS
───────────────────────────────────────────── */

/** Fetch all startups (publicly readable via RLS) */
export const fetchStartups = async () => {
  const { data, error } = await supabase
    .from("startups")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Startup[];
};

/** Fetch all job postings with startup name joined */
export const fetchJobPostings = async () => {
  const { data, error } = await supabase
    .from("job_postings")
    .select("*, startups(name)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as (JobPosting & { startups: { name: string } })[];
};

/** Upsert profile after sign-up (triggered by Auth) */
export const upsertProfile = async (profile: Partial<Profile> & { id: string }) => {
  const { error } = await supabase.from("profiles").upsert(profile);
  if (error) throw error;
};

/** Create a new startup listing (admin only — RLS enforced) */
export const createStartup = async (
  payload: Omit<Startup, "id" | "created_at">
) => {
  const { data, error } = await supabase.from("startups").insert(payload).select().single();
  if (error) throw error;
  return data as Startup;
};

/** Post a job listing (admin only — RLS enforced) */
export const createJobPosting = async (
  payload: Omit<JobPosting, "id" | "created_at">
) => {
  const { data, error } = await supabase.from("job_postings").insert(payload).select().single();
  if (error) throw error;
  return data as JobPosting;
};
