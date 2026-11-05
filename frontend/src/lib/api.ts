import {
  profile as fallbackProfile,
  stack as fallbackStack,
  projects as fallbackProjects,
  experience as fallbackExperience,
} from "@/data/content";

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

const fallbackNavLinks: NavLink[] = [
  { label: "Tentang", href: "#about", tag: "about" },
  { label: "Keahlian", href: "#stack", tag: "stack" },
  { label: "Proyek", href: "#projects", tag: "projects" },
  { label: "Pengalaman", href: "#experience", tag: "experience" },
];

export const fallbackPortfolioData: PortfolioData = {
  profile: {
    name: fallbackProfile.name,
    role: fallbackProfile.role,
    location: fallbackProfile.location,
    tagline: fallbackProfile.tagline,
    summary: fallbackProfile.summary,
    email: fallbackProfile.email,
    phone: fallbackProfile.phone,
    github: fallbackProfile.github,
    linkedin: fallbackProfile.linkedin,
    cvUrl: fallbackProfile.cvUrl,
    availableForWork: fallbackProfile.availableForWork,
    photo: fallbackProfile.photo,
  },
  stack: fallbackStack,
  projects: fallbackProjects,
  experience: fallbackExperience,
  navLinks: fallbackNavLinks,
};

/**
 * Fetches all portfolio content in a single request to the Express API.
 * `next: { revalidate }` lets Next.js cache the response and refresh it
 * periodically (ISR) instead of hitting the DB on every request.
 * Falls back gracefully to static content if the backend is unreachable.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/portfolio`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.profile) {
        return {
          profile: data.profile,
          stack: Array.isArray(data.stack) && data.stack.length > 0 ? data.stack : fallbackPortfolioData.stack,
          projects: Array.isArray(data.projects) && data.projects.length > 0 ? data.projects : fallbackPortfolioData.projects,
          experience: Array.isArray(data.experience) && data.experience.length > 0 ? data.experience : fallbackPortfolioData.experience,
          navLinks: Array.isArray(data.navLinks) && data.navLinks.length > 0 ? data.navLinks : fallbackPortfolioData.navLinks,
        };
      }
    }
  } catch (err) {
    console.warn("Backend API unavailable, using fallback portfolio data:", err);
  }

  return fallbackPortfolioData;
}
