"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories, type SkillCategory } from "@/lib/data";
import { cn } from "@/lib/utils";

const categoryColorMap: Record<SkillCategory["color"], {
  badge: string;
  dot: string;
  border: string;
  heading: string;
}> = {
  violet: {
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/20 hover:bg-violet-500/20 hover:border-violet-500/40",
    dot: "bg-violet-500",
    border: "border-violet-500/20",
    heading: "text-violet-300",
  },
  blue: {
    badge: "bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40",
    dot: "bg-blue-500",
    border: "border-blue-500/20",
    heading: "text-blue-300",
  },
  cyan: {
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40",
    dot: "bg-cyan-500",
    border: "border-cyan-500/20",
    heading: "text-cyan-300",
  },
  green: {
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40",
    dot: "bg-emerald-500",
    border: "border-emerald-500/20",
    heading: "text-emerald-300",
  },
};


interface SkillCategoryCardProps {
  category: SkillCategory;
  index: number;
}

function SkillCategoryCard({ category, index }: SkillCategoryCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const colors = categoryColorMap[category.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "glass-card p-6",
        `border-t-2 ${colors.border}`
      )}
      role="region"
      aria-label={`Categoría: ${category.category}`}
    >
      {/* Category header */}
      <div className="flex items-center gap-2.5 mb-5">
        <span
          className={cn("w-2 h-2 rounded-full", colors.dot)}
          aria-hidden="true"
        />
        <h3 className={cn("text-sm font-semibold uppercase tracking-wider", colors.heading)}>
          {category.category}
        </h3>
      </div>

      {/* Skills */}
      <ul
        className="flex flex-wrap gap-2"
        aria-label={`Habilidades en ${category.category}`}
        role="list"
      >
        {category.skills.map((skill, skillIndex) => (
          <motion.li
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1 + skillIndex * 0.05,
            }}
          >
            <span
              className={cn(
                "inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 cursor-default",
                colors.badge
              )}
            >
              {skill}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-24 px-4 sm:px-6 lg:px-8 section-bg-alt"
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
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3">
            Stack técnico
          </span>
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            <span className="gradient-text">Tecnologías</span>
          </h2>
          <p className="max-w-xl mx-auto text-white/50 text-sm sm:text-base">
            Herramientas y tecnologías con las que he trabajado en proyectos
            reales.
          </p>
        </motion.div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard
              key={category.category}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
