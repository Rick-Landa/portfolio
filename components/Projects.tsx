"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
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

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative glass-card p-6 flex flex-col gap-4 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-violet-500/10 hover:border-violet-500/20 transition-all duration-300 cursor-default"
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

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="Lista de proyectos"
        >
          {projects.map((project, index) => (
            <div key={project.name} role="listitem">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
