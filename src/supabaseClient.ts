import { createClient } from "@supabase/supabase-js";

/* ─────────────────────────────────────────────
   Supabase client with API proxy for restricted networks
   The proxy routes requests through your Vercel domain,
   allowing it to work on institute/corporate Wi-Fi
───────────────────────────────────────────── */

// Use proxy endpoint on production, direct URL on development
const isProduction = import.meta.env.MODE === 'production';
const SUPABASE_URL = isProduction
  ? `${window.location.origin}/api/proxy`
  : (import.meta.env.VITE_SUPABASE_URL ?? "https://YOUR_PROJECT.supabase.co");

const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON ?? "YOUR_ANON_KEY";

// Log configuration for debugging
console.log('[Supabase Config]', {
  mode: import.meta.env.MODE,
  isProduction,
  supabaseUrl: SUPABASE_URL?.substring(0, 50),
  usingProxy: isProduction,
});

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    // Disable realtime for restricted networks - use polling instead
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Add error event listener for debugging
supabase.auth.onAuthStateChange((event, session) => {
  console.log('[Auth Event]', event, session?.user?.email);
});

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
  try {
    const { data, error } = await supabase
      .from("startups")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error('[fetchStartups error]', error);
      throw error;
    }
    console.log('[fetchStartups] Success:', data?.length, 'startups');
    return data as Startup[];
  } catch (err) {
    console.error('[fetchStartups] Exception:', err);
    throw err;
  }
};

/** Fetch all job postings with startup name joined */
export const fetchJobPostings = async () => {
  try {
    const { data, error } = await supabase
      .from("job_postings")
      .select("*, startups(name)")
      .order("created_at", { ascending: false });
    if (error) {
      console.error('[fetchJobPostings error]', error);
      throw error;
    }
    console.log('[fetchJobPostings] Success:', data?.length, 'postings');
    return data as (JobPosting & { startups: { name: string } })[];
  } catch (err) {
    console.error('[fetchJobPostings] Exception:', err);
    throw err;
  }
};

/** Upsert profile after sign-up (triggered by Auth) */
export const upsertProfile = async (profile: Partial<Profile> & { id: string }) => {
  try {
    const { error } = await supabase.from("profiles").upsert(profile);
    if (error) {
      console.error('[upsertProfile error]', error);
      throw error;
    }
    console.log('[upsertProfile] Success');
  } catch (err) {
    console.error('[upsertProfile] Exception:', err);
    throw err;
  }
};

/** Create a new startup listing (admin only — RLS enforced) */
export const createStartup = async (
  payload: Omit<Startup, "id" | "created_at">
) => {
  try {
    const { data, error } = await supabase.from("startups").insert(payload).select().single();
    if (error) {
      console.error('[createStartup error]', error);
      throw error;
    }
    console.log('[createStartup] Success:', data?.id);
    return data as Startup;
  } catch (err) {
    console.error('[createStartup] Exception:', err);
    throw err;
  }
};

/** Post a job listing (admin only — RLS enforced) */
export const createJobPosting = async (
  payload: Omit<JobPosting, "id" | "created_at">
) => {
  try {
    const { data, error } = await supabase.from("job_postings").insert(payload).select().single();
    if (error) {
      console.error('[createJobPosting error]', error);
      throw error;
    }
    console.log('[createJobPosting] Success:', data?.id);
    return data as JobPosting;
  } catch (err) {
    console.error('[createJobPosting] Exception:', err);
    throw err;
  }
};
