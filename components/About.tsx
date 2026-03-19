"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, GraduationCap, Calendar } from "lucide-react";
import { stats } from "@/lib/data";

export default function About() {
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const contentInView = useInView(contentRef, { once: true, margin: "-80px" });

  const infoItems = [
    {
      icon: <MapPin size={14} aria-hidden="true" />,
      text: "Coatzacoalcos, Veracruz, México",
    },
    {
      icon: <GraduationCap size={14} aria-hidden="true" />,
      text: "Universidad Veracruzana — 8vo semestre",
    },
    {
      icon: <Calendar size={14} aria-hidden="true" />,
      text: "Graduación: Julio 2026",
    },
  ];

  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-heading"
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
            Conoce más
          </span>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold text-white"
          >
            Sobre{" "}
            <span className="gradient-text">mí</span>
          </h2>
        </motion.div>

        {/* Content: two-column layout */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left: Profile visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center lg:items-start gap-6"
          >
            {/* Avatar */}
            <div
              className="relative"
              aria-label="Imagen de perfil de Rick Landa"
            >
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shadow-2xl shadow-violet-500/20">
                <span
                  className="text-5xl sm:text-6xl font-bold text-white select-none"
                  aria-hidden="true"
                >
                  RL
                </span>
              </div>
              {/* Decorative ring */}
              <div
                className="absolute -inset-2 rounded-2xl border border-violet-500/20 -z-10"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-4 rounded-2xl border border-violet-500/10 -z-20"
                aria-hidden="true"
              />
            </div>

            {/* Info chips */}
            <ul className="flex flex-col gap-2.5 w-full max-w-xs" role="list" aria-label="Información de contacto">
              {infoItems.map((item) => (
                <li
                  key={item.text}
                  className="flex items-center gap-2.5 text-sm text-white/60"
                >
                  <span className="text-violet-400 shrink-0">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>

            {/* Stats row */}
            <div
              className="grid grid-cols-3 gap-3 w-full max-w-xs"
              aria-label="Estadísticas"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="glass-card p-3 text-center"
                >
                  <div className="text-lg font-bold gradient-text leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/60 mt-0.5 leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            <div className="space-y-4 text-white/70 leading-relaxed text-sm sm:text-base">
              <p>
                Soy Rick Landa, desarrollador web de{" "}
                <span className="text-white font-medium">21 años</span> originario
                de{" "}
                <span className="text-white font-medium">
                  Coatzacoalcos, Veracruz
                </span>
                . Estudio Ingeniería en sistemas en la Universidad Veracruzana,
                donde en mi último semestre he consolidado mis habilidades
                construyendo proyectos reales.
              </p>
              <p>
                He participado en{" "}
                <span className="text-violet-300 font-medium">
                  proyectos escolares colaborativos
                </span>
                , realicé mis{" "}
                <span className="text-blue-300 font-medium">
                  prácticas profesionales
                </span>{" "}
                desarrollando sistemas de gestión empresarial, y actualmente
                realizo mi{" "}
                <span className="text-violet-300 font-medium">
                  servicio social
                </span>{" "}
                en el área de Innovación Gubernamental del Ayuntamiento de
                Coatzacoalcos, donde desarrollo soluciones tecnológicas para
                modernizar procesos administrativos.
              </p>
              <p>
                Me apasiona crear aplicaciones que resuelvan problemas reales,
                usando tecnologías modernas tanto en{" "}
                <span className="text-white font-medium">frontend</span> como en{" "}
                <span className="text-white font-medium">backend</span>.
              </p>
            </div>

            {/* Experience timeline */}
            <div className="mt-4" aria-label="Línea de tiempo de experiencia">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/55 mb-4">
                Experiencia
              </h3>
              <ol className="relative border-l border-white/10 space-y-6 ml-3" role="list">
                {[
                  {
                    period: "2025 — Presente",
                    title: "Servicio Social",
                    place: "Ayuntamiento de Coatzacoalcos",
                    color: "bg-violet-500",
                  },
                  {
                    period: "2025",
                    title: "Prácticas Profesionales",
                    place: "Empresa privada",
                    color: "bg-blue-500",
                  },
                  {
                    period: "2022 — Presente",
                    title: "Proyectos Escolares",
                    place: "Universidad Veracruzana",
                    color: "bg-emerald-500",
                  },
                ].map((exp, i) => (
                  <motion.li
                    key={exp.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                    className="ml-4 relative"
                  >
                    <span
                      className={`absolute -left-6 top-1.5 w-2 h-2 rounded-full ${exp.color}`}
                      aria-hidden="true"
                    />
                    <time className="text-xs text-white/55">{exp.period}</time>
                    <p className="text-sm font-semibold text-white mt-0.5">
                      {exp.title}
                    </p>
                    <p className="text-xs text-white/50">{exp.place}</p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
