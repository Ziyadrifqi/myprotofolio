import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getPortfolioData } from "@/lib/api";

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