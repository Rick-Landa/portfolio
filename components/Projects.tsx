"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import Image from "next/image";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const roleColorMap: Record<Project["roleColor"], string> = {
  violet: "bg-violet-500/15 text-violet-300 border-violet-500/20",
  blue: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  green: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
};

const stackColorMap: Record<string, string> = {
  "Next.js": "bg-white/5 text-white/70",
  "Next.js 16": "bg-white/5 text-white/70",
  "React": "bg-cyan-500/10 text-cyan-300",
  "React 19": "bg-cyan-500/10 text-cyan-300",
  "TypeScript": "bg-blue-500/10 text-blue-300",
  "JavaScript": "bg-yellow-500/10 text-yellow-300",
  "Tailwind CSS": "bg-sky-500/10 text-sky-300",
  "NestJS": "bg-red-500/10 text-red-300",
  "Laravel 12": "bg-orange-500/10 text-orange-300",
  "Laravel / PHP": "bg-orange-500/10 text-orange-300",
  "MySQL": "bg-blue-400/10 text-blue-300",
  "MSSQL": "bg-blue-600/10 text-blue-300",
  "PostgreSQL": "bg-indigo-500/10 text-indigo-300",
  "MongoDB": "bg-green-500/10 text-green-300",
  "Mongoose": "bg-green-500/10 text-green-300",
  "JWT": "bg-violet-500/10 text-violet-300",
  "Node.js": "bg-green-600/10 text-green-300",
  "Express 5": "bg-white/5 text-white/60",
  "Vite": "bg-purple-500/10 text-purple-300",
  "Flutter": "bg-blue-400/10 text-blue-300",
  "Dart": "bg-blue-500/10 text-blue-300",
  "Firebase": "bg-yellow-600/10 text-yellow-300",
  "Google Maps": "bg-green-400/10 text-green-300",
  "Microsoft Graph": "bg-blue-600/10 text-blue-300",
  "Swiper.js": "bg-blue-500/10 text-blue-300",
  "Jest": "bg-red-400/10 text-red-300",
  "Supertest": "bg-purple-400/10 text-purple-300",
  "K6": "bg-violet-400/10 text-violet-300",
};

function getStackColor(tech: string): string {
  return stackColorMap[tech] ?? "bg-white/5 text-white/60";
}

// ── Lightbox modal ────────────────────────────────────────────────────────────
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <span className="absolute top-5 left-1/2 -translate-x-1/2 text-xs text-white/60">
        {current + 1} / {images.length}
      </span>

      {/* Image */}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[current]}
          alt={`Screenshot ${current + 1}`}
          fill
          className="object-contain"
          sizes="100vw"
          quality={100}
          priority
          unoptimized
        />
      </motion.div>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Imagen anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Imagen siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                aria-label={`Ir a imagen ${i + 1}`}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors duration-200",
                  i === current ? "bg-white" : "bg-white/40"
                )}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

// ── Thumbnail carousel (inside card) ─────────────────────────────────────────
function ProjectImageCarousel({
  images,
  onExpand,
}: {
  images: string[];
  onExpand: (index: number) => void;
}) {
  const [current, setCurrent] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrent((i) => (i + 1) % images.length);
  };

  return (
    <div
      className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/5 group/carousel cursor-zoom-in"
      onClick={() => onExpand(current)}
    >
      <Image
        src={images[current]}
        alt={`Screenshot ${current + 1}`}
        fill
        className="object-cover object-top transition-transform duration-300 group-hover/carousel:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
        unoptimized
      />

      {/* Expand hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 bg-black/20">
        <div className="p-2 rounded-full bg-black/50 text-white">
          <Expand size={18} />
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(e); }}
            aria-label="Imagen anterior"
            className="absolute left-1.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 hover:bg-black/70 z-10"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(e); }}
            aria-label="Imagen siguiente"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 hover:bg-black/70 z-10"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10" onClick={(e) => e.stopPropagation()}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                aria-label={`Ir a imagen ${i + 1}`}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors duration-200",
                  i === current ? "bg-white" : "bg-white/40"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────
interface ProjectCardProps {
  project: Project;
  index: number;
  onExpand: (images: string[], index: number) => void;
}

function ProjectCard({ project, index, onExpand }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative glass-card p-6 flex flex-col gap-4 h-full hover:-translate-y-1.5 hover:shadow-xl hover:shadow-violet-500/10 hover:border-violet-500/20 transition-all duration-300 cursor-default"
      aria-label={`Proyecto: ${project.name}`}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Image carousel */}
      {project.images && project.images.length > 0 && (
        <ProjectImageCarousel
          images={project.images}
          onExpand={(i) => onExpand(project.images!, i)}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-white leading-tight">
          {project.name}
        </h3>
        <span
          className={cn(
            "shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium border",
            roleColorMap[project.roleColor]
          )}
        >
          {project.role}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-white/60 leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Tech stack */}
      <div
        className="flex flex-wrap gap-1.5"
        aria-label={`Tecnologías: ${project.stack.join(", ")}`}
      >
        {project.stack.map((tech) => (
          <span
            key={tech}
            className={cn(
              "px-2 py-0.5 rounded-md text-xs font-medium",
              getStackColor(tech)
            )}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3 pt-1 border-t border-white/5">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver código de ${project.name} en GitHub`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 rounded"
        >
          <Github size={14} aria-hidden="true" />
          Ver código
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver demo de ${project.name}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-400 hover:text-violet-300 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 rounded"
          >
            <ExternalLink size={14} aria-hidden="true" />
            Demo
          </a>
        )}
      </div>
    </motion.article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  return (
    <section
      id="proyectos"
      aria-labelledby="projects-heading"
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-400 mb-3">
            Portafolio
          </span>
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Mis{" "}
            <span className="gradient-text">Proyectos</span>
          </h2>
          <p className="max-w-xl mx-auto text-white/50 text-sm sm:text-base">
            Proyectos desarrollados durante mi formación, prácticas profesionales
            y servicio social.
          </p>
        </motion.div>

        {/* Project grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch"
          role="list"
          aria-label="Lista de proyectos"
        >
          {projects.map((project, index) => (
            <div key={project.name} role="listitem" className="flex">
              <ProjectCard
                project={project}
                index={index}
                onExpand={(images, i) => setLightbox({ images, index: i })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            startIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
