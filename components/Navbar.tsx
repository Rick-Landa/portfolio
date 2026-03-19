"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Skills", href: "#skills" },
  { label: "Sobre mí", href: "#sobre-mi" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [mobileOpen]);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      role="banner"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-nav" : "bg-transparent"
      )}
    >
      <nav
        aria-label="Navegación principal"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
      >
        {/* Logo */}
        <a
          href="#"
          aria-label="Rick Landa - Ir al inicio"
          className="flex items-center gap-2 group"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-violet-500/40 transition-shadow duration-300">
            RL
          </div>
          <span className="hidden sm:block font-semibold text-white/90 group-hover:text-white transition-colors">
            Rick Landa
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#contacto");
              }}
              className="ml-2 px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-500 hover:to-blue-400 transition-all duration-200 shadow-lg hover:shadow-violet-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
            >
              Contacto
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        aria-label="Menú de navegación móvil"
        hidden={!mobileOpen}
        className={cn(
          "md:hidden glass-nav border-t border-white/5 overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="px-4 py-3 flex flex-col gap-1" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#contacto");
              }}
              className="block px-4 py-3 text-sm font-semibold text-violet-300 hover:text-violet-200 rounded-lg hover:bg-violet-500/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60"
            >
              Contacto
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
