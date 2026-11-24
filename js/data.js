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
    "Flutter Web Developer building mobile and web applications with Flutter, Dart, and supporting backend and database technologies. Redeveloped reporting software with Flutter Web, built a reusable internal Flutter Web framework, and developed Spring Boot backend services on SQL, PL/SQL, JDBC, and Oracle Database. Also ships Flutter mobile apps to Google Play, using BLoC and GetX for state management. Strong foundation in problem solving, teamwork, and human-computer interaction.",
};

export const HIGHLIGHTS = [
  {
    value: "May 2023 – Present",
    label: "Software Developer · X/Link",
    icon: "briefcase",
  },
  {
    value: "6 Flutter Apps",
    label: "2 live on Google Play · 2021 to 2026",
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
    items: ["Dart", "Java", "Kotlin", "JavaScript", "SQL", "PL/SQL", "HTML", "PHP"],
  },
  {
    id: "mobile-web",
    title: "Mobile & Web Development",
    icon: "smartphone",
    items: [
      "Flutter",
      "Flutter Web",
      "BLoC",
      "GetX",
      "Firebase",
      "Android Development",
      "Android Studio",
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: "server",
    items: [
      "Spring Boot",
      "Spring MVC",
      "REST APIs",
      "API Integration",
      "JDBC",
      "Node.js",
      "Express.js",
    ],
  },
  {
    id: "database",
    title: "Databases & Reporting",
    icon: "database",
    items: [
      "Oracle Database",
      "SQL Server",
      "MySQL",
      "PostgreSQL",
      "Stored Procedures",
      "Query Optimization",
      "Database Design",
      "Reporting Queries",
    ],
  },
  {
    id: "tools",
    title: "Tools & Deployment",
    icon: "terminal",
    items: ["Git", "Docker", "Docker Compose", "Nginx", "Ubuntu", "WSL", "Mockoon"],
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
  start: "2023-05",
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

// Newest first. `start` (YYYY or YYYY-MM) orders the projects timeline.
export const PROJECTS = [
  {
    id: "docker-flutter-springboot",
    title: "Flutter Web + Spring Boot Docker Starter",
    role: "Open Source",
    period: "2026",
    start: "2026-03",
    category: "Open Source",
    stack: ["Flutter Web", "Spring Boot", "PostgreSQL", "Docker Compose"],
    shortDescription:
      "A Dockerized Flutter Web, Spring Boot, and PostgreSQL environment that starts with one command, shown with a product CRUD demo.",
    details: [
      "Runs Flutter Web, a Spring Boot API, and PostgreSQL together with Docker Compose, so a new developer starts the whole stack with one command.",
      "Serves the Flutter Web frontend through Node.js for a flexible, easy to debug development flow.",
      "Built from the setup used in real Flutter Web and Spring Boot projects to remove environment drift between machines.",
    ],
    link: {
      href: "https://github.com/zzulfiqor/docker_flutter_springboot",
      label: "View the repository on GitHub",
      icon: "github",
    },
  },
  {
    id: "wadja-institute",
    title: "Wadja Institute",
    role: "Mobile Developer (Flutter)",
    client: "PT Wadja Karya Dunia",
    period: "Dec 2025 – Mar 2026",
    start: "2025-12",
    category: "Freelance",
    stack: ["Flutter", "Dart", "Google Play"],
    shortDescription:
      "Built and released the Wadja Institute mobile app on Google Play, with a reusable set of UI components.",
    details: [
      "Developed and implemented the Wadja Institute mobile application using Flutter.",
      "Designed responsive and user-friendly mobile interfaces based on application requirements.",
      "Built consistent UI components to keep a clean and reusable UI structure.",
      "Prepared and released the application to the Google Play Store.",
    ],
    link: {
      href: "https://play.google.com/store/apps/details?id=com.wadja.institute",
      label: "Open Wadja Institute on Google Play",
      icon: "external",
    },
  },
  {
    id: "halanesia",
    title: "Halanesia",
    role: "Flutter Developer (Contract)",
    period: "Jan 2022 – Jul 2022",
    start: "2022-01",
    category: "E-Commerce",
    stack: ["Flutter", "Dart", "Firebase", "GetX"],
    shortDescription:
      "Developed application features for an e-commerce platform that sells halal products using Flutter.",
    details: [
      "Collaborated with the backend team to build the Halanesia e-commerce Android app with Flutter.",
      "Implemented UI designs and integrated APIs to improve the shopping experience.",
      "Took part in code reviews and testing to keep deliverables at a high quality.",
      "Contributed to ongoing improvements in app performance and functionality.",
    ],
  },
  {
    id: "topkarir",
    title: "TopKarir",
    role: "Flutter Developer",
    period: "Nov 2021 – Jan 2022",
    start: "2021-11",
    category: "Career Platform",
    stack: ["Flutter", "Dart", "QuickApply UI"],
    shortDescription:
      "Developed mobile frontend features including QuickApply swipe-based job application and an in-app coin feature.",
    details: [
      "Developed and improved mobile frontend features using Flutter, including QuickApply, a swipe-based job application feature.",
      "Worked on the coin feature used within the application to unlock selected functionality.",
    ],
  },
  {
    id: "egp-akses",
    title: "EGP Akses",
    role: "Flutter Developer (Freelance)",
    client: "PT. Esa Garda Pratama",
    period: "Jun 2021 – Dec 2021",
    start: "2021-06",
    category: "Workforce Ops",
    stack: ["Flutter", "Dart", "Firebase", "BLoC"],
    shortDescription:
      "Internal Android app for tracking employee attendance online and offline, with daily job reporting.",
    details: [
      "Developed an internal Android application for online and offline employee attendance tracking at PT. Esa Garda Pratama.",
      "Collaborated with the backend team on integration so attendance and daily job reports sync reliably.",
      "Built features that streamline attendance recording for field personnel.",
    ],
    link: {
      href: "https://play.google.com/store/apps/details?id=com.kardusinfo.egpakses",
      label: "Open EGP Akses on Google Play",
      icon: "external",
    },
  },
  {
    id: "crsl-inventory",
    title: "CRSL Warehouse Inventory",
    role: "Flutter Developer (Freelance)",
    client: "CRSL",
    period: "Apr 2021 – May 2021",
    start: "2021-04",
    category: "Inventory",
    stack: ["Flutter", "Dart", "Firebase", "GetX"],
    shortDescription:
      "Flutter app for warehouse inventory management with real-time stock tracking on a Firebase backend.",
    details: [
      "Developed a Flutter application for warehouse inventory management using a Firebase backend.",
      "Implemented real-time stock tracking to support day-to-day warehouse operations.",
      "Worked with the team to integrate Flutter and Firebase cleanly.",
    ],
  },
  {
    id: "emkay-app",
    title: "Emkay App",
    role: "Flutter Developer",
    period: "2021",
    start: "2021",
    category: "E-Commerce",
    stack: ["Flutter", "Android", "E-Commerce"],
    shortDescription:
      "Built an Android e-commerce application tailored for the Emkay brand.",
    details: [
      "Built an Android e-commerce application for the Emkay brand using Flutter.",
      "Structured mobile storefront screens and purchasing workflows for brand customers.",
    ],
  },
  {
    id: "amikom-center",
    title: "Amikom Center",
    role: "Android Programmer (Internship)",
    period: "Sep 2020 – Nov 2020",
    start: "2020-09",
    category: "Internship",
    stack: ["Android", "Dart"],
    shortDescription: "Android programming internship at Amikom Center in Yogyakarta.",
    details: ["Android programmer internship at Amikom Center, Yogyakarta."],
  },
];

export const EDUCATION = {
  degree: "Bachelor of Informatics",
  institution: "Universitas Amikom Yogyakarta",
  period: "Sep 2017 – Dec 2022",
  location: "Yogyakarta, Indonesia",
  gpa: "3.69 / 4.00",
  coursework: [
    "Programming Principles",
    "Mobile Application",
    "Databases",
    "Project Management",
    "Human-Computer Interaction",
  ],
  earlier: [
    { school: "MA Salafiyah Kajen", track: "Science (IPA)", period: "2012 – 2015" },
    { school: "MTs Salafiyah Kajen", track: "Science (IPA)", period: "2009 – 2012" },
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
    title: "Belajar Membuat Aplikasi Flutter untuk Pemula",
    issuer: "Dicoding Indonesia",
    year: "Jun 2022",
    url: "https://www.dicoding.com/certificates/6RPNDV3DRZ2M",
  },
  {
    title: "Memulai Pemrograman Dengan Dart",
    issuer: "Dicoding Indonesia",
    year: "Jun 2022",
    url: "https://www.dicoding.com/certificates/1OP861LQ1XQK",
  },
  {
    title: "Menjadi Developer Android Expert",
    issuer: "Dicoding Academy",
    year: "Oct 2019",
    url: "https://drive.google.com/file/d/1SeoZ4tlwldHxc5qLzDrngET6wLM0QERQ/view",
  },
  { title: "REST APIs", issuer: "LinkedIn Skill Assessment", year: "Passed" },
  { title: "Android", issuer: "LinkedIn Skill Assessment", year: "Passed" },
];

// Summaries of LinkedIn posts (written in Bahasa Indonesia), newest first.
export const WRITING = [
  {
    title: "Keeping an internal Flutter Web library pleasant across projects",
    summary:
      "Why repeated setup work led to a shared Flutter Web framework, and the balance between flexible and simple components.",
  },
  {
    title: "My first CORS error in Flutter Web",
    summary:
      "An API call that worked on Android failed in Chrome. What CORS is, and the one server setting that fixed it.",
  },
  {
    title: "Three years of Flutter Web in production",
    summary:
      "From a first dashboard to a Dockerized Flutter Web and Spring Boot setup, and when Flutter Web is the right tool.",
  },
  {
    title: "Why we chose BLoC for Flutter Web state",
    summary:
      "Provider, Riverpod, and BLoC compared for enterprise dashboards, where users open tabs, resize, and navigate freely.",
  },
];
