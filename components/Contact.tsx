"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight } from "lucide-react";

interface ContactCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  description: string;
  accentColor: string;
  hoverBorder: string;
}

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-80px" });

  const contactCards: ContactCard[] = [
    {
      icon: <Mail size={22} aria-hidden="true" />,
      label: "Email",
      value: "ricklanda020@gmail.com",
      href: "mailto:ricklanda020@gmail.com",
      description: "Escríbeme directamente",
      accentColor: "text-violet-400",
      hoverBorder: "hover:border-violet-500/30 hover:shadow-violet-500/10",
    },
    {
      icon: <Linkedin size={22} aria-hidden="true" />,
      label: "LinkedIn",
      value: "linkedin.com/in/rick-landa",
      href: "https://www.linkedin.com/in/rick-landa/",
      description: "Conectemos profesionalmente",
      accentColor: "text-blue-400",
      hoverBorder: "hover:border-blue-500/30 hover:shadow-blue-500/10",
    },
    {
      icon: <Github size={22} aria-hidden="true" />,
      label: "GitHub",
      value: "github.com/Rick-Landa",
      href: "https://github.com/Rick-Landa",
      description: "Revisa mis repositorios",
      accentColor: "text-white/70",
      hoverBorder: "hover:border-white/20 hover:shadow-white/5",
    },
  ];

  return (
    <section
      id="contacto"
      aria-labelledby="contact-heading"
      className="py-24 px-4 sm:px-6 lg:px-8 section-bg-alt"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3">
            Hablemos
          </span>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            <span className="gradient-text">Contáctame</span>
          </h2>
          <p className="max-w-lg mx-auto text-white/50 text-sm sm:text-base">
            Estoy disponible para proyectos freelance, oportunidades laborales o
            simplemente para intercambiar ideas sobre tecnología.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          role="list"
          aria-label="Métodos de contacto"
        >
          {contactCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              role="listitem"
            >
              <a
                href={card.href}
                target={card.href.startsWith("mailto") ? undefined : "_blank"}
                rel={card.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={`${card.label}: ${card.value}`}
                className={`group glass-card p-6 flex flex-col gap-4 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 rounded-2xl ${card.hoverBorder}`}
              >
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${card.accentColor} group-hover:scale-110 transition-transform duration-200`}
                  aria-hidden="true"
                >
                  {card.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/55 mb-1">
                    {card.label}
                  </p>
                  <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-200 break-all">
                    {card.value}
                  </p>
                  <p className="text-xs text-white/55 mt-1.5">
                    {card.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="flex justify-end">
                  <ArrowUpRight
                    size={14}
                    className="text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={cardsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-white/50 mt-12"
        >
          Tiempo de respuesta promedio:{" "}
          <span className="text-white/50">menos de 24 horas</span>
        </motion.p>
      </div>
    </section>
  );
}
