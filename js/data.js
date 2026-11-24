export const PROFILE = {
  fullName: "Ahmad Zuhair Dzulfiqor",
  firstName: "Ahmad Zuhair",
  lastName: "Dzulfiqor",
  brandName: "Ahmad Zuhair",
  role: "Flutter Web Developer | Mobile Developer",
  location: "South Jakarta, Indonesia",
  phoneDisplay: "(+62) 812-1581-9957",
  phoneHref: "tel:+6281215819957",
  email: "zzulfiqor@gmail.com",
  githubDisplay: "github.com/zzulfiqor",
  githubUrl: "https://github.com/zzulfiqor",
  linkedinDisplay: "linkedin.com/in/zuhairdzulfiqor",
  summary:
    "Flutter Web Developer with experience building mobile and web applications using Flutter, Dart, and supporting backend/database technologies. Experienced in developing Flutter Web reporting applications, creating reusable Flutter Web frameworks, building Spring Boot backend services, and maintaining stored procedures/functions for database-driven reporting workflows. Strong foundation in problem solving, mobile development, teamwork, and human-computer interaction.",
};

export const HIGHLIGHTS = [
  {
    value: "May 2023 – Present",
    label: "Software Developer · X/Link",
    icon: "briefcase",
  },
  {
    value: "4 Shipped Apps",
    label: "Halanesia, TopKarir, Emkay, EGP",
    icon: "smartphone",
  },
  {
    value: "3.69 / 4.00",
    label: "GPA · Bachelor of Informatics",
    icon: "award",
  },
  {
    value: "End-to-End",
    label: "Flutter Web, Spring Boot & SQL",
    icon: "layers",
  },
];

export const SKILL_GROUPS = [
  {
    id: "languages",
    title: "Programming Languages",
    icon: "code",
    items: ["Dart", "Java", "Kotlin", "JavaScript", "SQL"],
  },
  {
    id: "mobile-web",
    title: "Mobile & Web Development",
    icon: "smartphone",
    items: ["Flutter", "Flutter Web", "Android Studio"],
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: "server",
    items: ["Spring Boot", "REST API Development", "Backend Service Maintenance"],
  },
  {
    id: "database",
    title: "Databases & Reporting",
    icon: "database",
    items: [
      "SQL Server",
      "MySQL",
      "Stored Procedures",
      "Database Functions",
      "Reporting Queries",
    ],
  },
  {
    id: "tools",
    title: "Tools & Deployment",
    icon: "terminal",
    items: ["Git", "Docker", "Nginx", "Server Deployment"],
  },
  {
    id: "product",
    title: "Product & Design",
    icon: "compass",
    items: [
      "UI/UX Design",
      "Problem Solving",
      "Team Collaboration",
      "Human-Computer Interaction",
    ],
  },
];

export const EXPERIENCE = {
  role: "Software Developer",
  company: "X/Link Software",
  period: "May 2023 – Present",
  layers: [
    { id: "all", label: "All Highlights" },
    { id: "frontend", label: "Flutter & UI/UX" },
    { id: "backend", label: "Spring Boot & SQL" },
    { id: "infra", label: "Docker & Nginx" },
  ],
  highlights: [
    {
      layer: "frontend",
      text: "Created a reusable Flutter Web framework used to build multiple web-based Flutter applications, standardizing project structure, shared components, and development workflows.",
    },
    {
      layer: "frontend",
      text: "Developed and improved reporting software applications using Flutter Web, focusing on usability, efficiency, and maintainable web-based workflows.",
    },
    {
      layer: "backend",
      text: "Built and maintained backend services using Spring Boot to support reporting features, business logic, and system integration needs.",
    },
    {
      layer: "backend",
      text: "Maintained and optimized stored procedures, database functions, and reporting queries used for data processing, filtering, and report generation workflows.",
    },
    {
      layer: "backend",
      text: "Handled end-to-end reporting application development across frontend, backend, and database layers to ensure reliable data flow and consistent application behavior.",
    },
    {
      layer: "infra",
      text: "Deployed and maintained application services in server environments using Docker and Nginx.",
    },
    {
      layer: "frontend",
      text: "Built dynamic and user-friendly interfaces using Flutter and Dart, while applying UI/UX principles to improve screen structure, flow consistency, and overall user experience.",
    },
    {
      layer: "infra",
      text: "Collaborated with team members to analyze problems, implement improvements, and support application development activities.",
    },
  ],
};

export const PROJECTS = [
  {
    id: "halanesia",
    title: "Halanesia",
    role: "Flutter Developer",
    period: "January 2022",
    category: "E-Commerce",
    stack: ["Flutter", "Dart", "Mobile UI"],
    shortDescription:
      "Developed application features for an e-commerce platform that sells halal products using Flutter.",
    details: [
      "Built core mobile shopping features for a halal product e-commerce marketplace using Flutter and Dart.",
      "Implemented responsive mobile views focused on product discovery and clean shopping flows.",
    ],
    previewTheme: "halal",
  },
  {
    id: "topkarir",
    title: "TopKarir",
    role: "Flutter Developer",
    period: "Nov 2021 – Jan 2022",
    category: "Career Platform",
    stack: ["Flutter", "Dart", "QuickApply UI"],
    shortDescription:
      "Developed mobile frontend features including QuickApply swipe-based job application and an in-app coin feature.",
    details: [
      "Developed and improved mobile frontend features using Flutter, including QuickApply, a swipe-based job application feature.",
      "Worked on the coin feature used within the application to unlock selected functionality.",
    ],
    previewTheme: "career",
  },
  {
    id: "emkay-app",
    title: "Emkay App",
    role: "Flutter Developer",
    period: "2021",
    category: "E-Commerce",
    stack: ["Flutter", "Android", "E-Commerce"],
    shortDescription:
      "Built an Android e-commerce application tailored for the Emkay brand.",
    details: [
      "Built an Android e-commerce application for the Emkay brand using Flutter.",
      "Structured mobile storefront screens and purchasing workflows for brand customers.",
    ],
    previewTheme: "brand",
  },
  {
    id: "egp-security",
    title: "EGP Security App",
    role: "Flutter Developer",
    period: "2021",
    category: "Workforce Ops",
    stack: ["Flutter", "Android", "Reporting"],
    shortDescription:
      "Developed an Android app for employee attendance, daily job reporting, and work-related data management.",
    details: [
      "Developed an Android application for employee attendance, daily job reporting, and work-related data management.",
      "Designed clear mobile workflows so field personnel can log attendance and submit daily reports reliably.",
    ],
    previewTheme: "security",
  },
];

export const EDUCATION = {
  degree: "Bachelor of Informatics",
  institution: "Universitas Amikom Yogyakarta",
  period: "2017 – 2022",
  location: "Yogyakarta, Indonesia",
  gpa: "3.69 / 4.00",
  coursework: [
    "Programming Principles",
    "Mobile Application",
    "Databases",
    "Project Management",
    "Human-Computer Interaction",
  ],
};

export const ARCHITECTURE_PIPELINE = [
  {
    id: "flutter-web",
    step: "01",
    label: "Flutter Web UI",
    tech: "Flutter · Dart · Reusable Framework",
    detail:
      "Standardized project structure, shared components, and reporting interfaces built with Flutter Web and HCI principles.",
  },
  {
    id: "spring-boot",
    step: "02",
    label: "Spring Boot API",
    tech: "Java · Spring Boot · REST APIs",
    detail:
      "Backend services handling business logic, reporting endpoints, and reliable system integrations.",
  },
  {
    id: "sql-reporting",
    step: "03",
    label: "SQL Reporting Engine",
    tech: "SQL Server · MySQL · Stored Procedures",
    detail:
      "Optimized stored procedures, database functions, and reporting queries for data processing and filtering workflows.",
  },
  {
    id: "docker-nginx",
    step: "04",
    label: "Server Deployment",
    tech: "Docker · Nginx · Git",
    detail:
      "Containerized application services deployed and maintained in production server environments using Docker and Nginx.",
  },
];

export const CERTIFICATIONS = [
  {
    title: "Membuat Aplikasi Flutter untuk Pemula",
    issuer: "Dicoding",
    year: "2022",
  },
];
