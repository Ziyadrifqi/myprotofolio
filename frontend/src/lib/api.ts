const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type Profile = {
  name: string;
  role: string;
  location: string;
  tagline: string;
  summary: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  cvUrl: string;
  availableForWork: boolean;
  photo: string;
};

export type StackGroup = {
  group: string;
  proficiency: number;
  tools: string[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  href: string | null;
  repo: string | null;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

export type NavLink = {
  label: string;
  href: string;
  tag: string;
};

export type PortfolioData = {
  profile: Profile;
  stack: StackGroup[];
  projects: Project[];
  experience: Experience[];
  navLinks: NavLink[];
};

/**
 * Fetches all portfolio content in a single request to the Express API.
 * `next: { revalidate }` lets Next.js cache the response and refresh it
 * periodically (ISR) instead of hitting the DB on every request.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const res = await fetch(`${API_BASE_URL}/api/portfolio`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to load portfolio data: ${res.status}`);
  }

  return res.json();
}
