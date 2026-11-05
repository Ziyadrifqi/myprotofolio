import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getPortfolioData } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getPortfolioData();
  const title = `${profile.name} — ${profile.role}`;
  const description = profile.summary || profile.tagline || `Portofolio ${profile.name}`;
  const photoUrl = profile.photo ? (profile.photo.startsWith("http") ? profile.photo : profile.photo) : "/images/foto.png";

  return {
    title,
    description,
    authors: [{ name: profile.name }],
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: photoUrl,
          alt: profile.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [photoUrl],
    },
  };
}

export default async function Home() {
  const { profile, stack, projects, experience, navLinks } = await getPortfolioData();

  return (
    <>
      <Navbar profile={profile} navLinks={navLinks} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Stack stack={stack} />
        <Projects projects={projects} />
        <Experience experience={experience} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </>
  );
}