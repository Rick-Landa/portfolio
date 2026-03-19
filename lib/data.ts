export interface Project {
  name: string;
  role: string;
  roleColor: "violet" | "blue" | "green";
  description: string;
  stack: string[];
  github: string;
  demo: string | null;
}

export interface SkillCategory {
  category: string;
  color: "violet" | "blue" | "cyan" | "green";
  skills: string[];
}

export const projects: Project[] = [
  {
    name: "Control de Dictámenes",
    role: "Servicio Social",
    roleColor: "violet",
    description:
      "Sistema web para gestión y seguimiento de dictámenes técnicos de equipos de cómputo en el área de Innovación Gubernamental del Ayuntamiento de Coatzacoalcos. Incluye flujo de estatus, carga de PDFs, autenticación JWT y API REST.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "NestJS",
      "MSSQL",
      "JWT",
    ],
    github: "https://github.com/Rick-Landa/Control-Dictamen-Frontend",
    demo: null,
  },
  {
    name: "Sistema LINA",
    role: "Prácticas Profesionales",
    roleColor: "blue",
    description:
      "Sistema de gestión desarrollado durante prácticas profesionales. Frontend moderno con React y Vite, backend robusto en Laravel 12 con autenticación OAuth2 (Microsoft Graph), generación de PDFs y pruebas de carga con K6.",
    stack: [
      "React 19",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Laravel 12",
      "MySQL",
      "Microsoft Graph",
    ],
    github: "https://github.com/Rick-Landa/front-sistema-lina",
    demo: null,
  },
  {
    name: "CaniColectivo",
    role: "Proyecto Escolar",
    roleColor: "green",
    description:
      "Plataforma web para CANI Colectivo, organización sin fines de lucro dedicada a la difusión y fortalecimiento del talento artístico en el sur de Veracruz. Incluye perfiles de artistas, gestión de eventos y especialidades.",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Swiper.js",
      "Node.js",
    ],
    github: "https://github.com/jjcm296/CaniColectivo",
    demo: null,
  },
  {
    name: "Viayage",
    role: "Proyecto Escolar",
    roleColor: "green",
    description:
      "Aplicación móvil multiplataforma para planificación de viajes con integración de Google Maps, geolocalización, texto a voz y soporte multilenguaje. Backend en NestJS con PostgreSQL y notificaciones por email.",
    stack: [
      "Flutter",
      "Dart",
      "Firebase",
      "NestJS",
      "PostgreSQL",
      "Google Maps",
      "JWT",
    ],
    github: "https://github.com/josephaven/viayage-frontend",
    demo: null,
  },
  {
    name: "API Blood Donation",
    role: "Proyecto Escolar",
    roleColor: "green",
    description:
      "Plataforma REST API que conecta donadores de sangre con solicitantes. Tres perfiles de usuario: donadores, solicitantes personales e institucionales. Incluye búsqueda de donadores, gestión de solicitudes y contacto vía WhatsApp.",
    stack: [
      "Node.js",
      "Express 5",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Jest",
      "Supertest",
    ],
    github: "https://github.com/zuzzet514/api-blood-donation",
    demo: null,
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    color: "violet",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Flutter / Dart",
    ],
  },
  {
    category: "Backend",
    color: "blue",
    skills: ["NestJS", "Laravel / PHP", "Express.js", "Node.js"],
  },
  {
    category: "Bases de Datos",
    color: "cyan",
    skills: ["PostgreSQL", "MySQL", "MSSQL", "MongoDB"],
  },
  {
    category: "Herramientas & DevOps",
    color: "green",
    skills: ["Git / GitHub", "Docker", "JWT", "REST APIs", "K6", "Firebase"],
  },
];

export const stats = [
  { value: "5+", label: "Proyectos" },
  { value: "2", label: "Años de experiencia" },
  { value: "Julio 2026", label: "Graduación" },
];

export const typewriterStrings = [
  "Desarrollador Full Stack",
  "Estudiante UV Coatzacoalcos",
  "Apasionado por la tecnología",
];
