import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <footer
        role="contentinfo"
        className="py-8 px-4 border-t border-white/5 text-center"
      >
        <p className="text-sm text-white/30">
          &copy; 2026 Rick Landa &middot; Hecho con{" "}
          <span className="text-white/50">Next.js &amp; Tailwind CSS</span>
        </p>
      </footer>
    </>
  );
}
