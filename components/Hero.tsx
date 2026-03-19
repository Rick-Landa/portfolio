"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { typewriterStrings } from "@/lib/data";

function TypewriterText() {
  const [displayText, setDisplayText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentString = typewriterStrings[stringIndex];

    const tick = () => {
      if (!isDeleting) {
        if (charIndex < currentString.length) {
          setDisplayText(currentString.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
          timeoutRef.current = setTimeout(tick, 60);
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentString.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
          timeoutRef.current = setTimeout(tick, 35);
        } else {
          setIsDeleting(false);
          setStringIndex((i) => (i + 1) % typewriterStrings.length);
          timeoutRef.current = setTimeout(tick, 300);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, 100);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIndex, isDeleting, stringIndex]);

  return (
    <span aria-live="polite" aria-label={`Rol actual: ${displayText}`}>
      <span className="gradient-text">{displayText}</span>
      <span
        className="inline-block w-0.5 h-7 ml-1 bg-violet-400 animate-pulse align-middle"
        aria-hidden="true"
      />
    </span>
  );
}

// Floating geometric shapes for background decoration
function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Large blurred orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="absolute top-1/4 -right-24 w-80 h-80 rounded-full bg-blue-500/8 blur-3xl animate-pulse" style={{ animationDuration: "6s", animationDelay: "1s" }} />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-violet-500/6 blur-3xl animate-pulse" style={{ animationDuration: "5s", animationDelay: "2s" }} />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Small geometric accents */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-3 h-3 border border-violet-500/30 rotate-45"
        animate={{ rotate: [45, 225, 45], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-blue-400/40"
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-4 h-4 border border-blue-400/20 rotate-12"
        animate={{ rotate: [12, 180, 12], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </div>
  );
}

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector("#proyectos")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      aria-label="Sección de presentación"
      className="relative min-h-screen flex items-center justify-center hero-bg overflow-hidden"
    >
      <FloatingShapes />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-500/20 text-violet-300 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" aria-hidden="true" />
            Disponible para proyectos
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          <span className="text-white">Rick </span>
          <span className="gradient-text">Landa</span>
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl sm:text-2xl lg:text-3xl font-medium text-white/80 mb-6 h-10 flex items-center justify-center"
        >
          <TypewriterText />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-white/60 leading-relaxed mb-10"
        >
          Desarrollo aplicaciones web y móviles modernas. Estudiante de la
          Universidad Veracruzana en último semestre, con experiencia en
          proyectos escolares, prácticas profesionales y servicio social en el
          sector gubernamental.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <button
            onClick={scrollToProjects}
            aria-label="Ver mis proyectos"
            className="px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-500 hover:to-blue-400 transition-all duration-200 shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 text-sm sm:text-base"
          >
            Ver proyectos
          </button>
          <button
            onClick={scrollToContact}
            aria-label="Ir a la sección de contacto"
            className="px-8 py-3.5 rounded-xl font-semibold text-white/90 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 text-sm sm:text-base backdrop-blur-sm"
          >
            Contáctame
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <a
            href="https://github.com/Rick-Landa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil de GitHub de Rick Landa"
            className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
          >
            <Github size={18} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/rick-landa/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil de LinkedIn de Rick Landa"
            className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
          >
            <Linkedin size={18} aria-hidden="true" />
          </a>
          <span className="w-px h-5 bg-white/10" aria-hidden="true" />
          <span className="text-xs text-white/55">Coatzacoalcos, Ver.</span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-xs text-white/50 tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} className="text-white/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
