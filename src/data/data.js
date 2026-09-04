import weatherImg from '../assets/weather.jpg';
import driveSmartImg from '../assets/drive_smart.png';
import aiAgentImg from '../assets/AI-Agent.jpg';

export const projectList = [
  {
    title: "Weather Forecast Accuracy Project",
    desc: "I built a Weather Forecast Accuracy System using Linux and Bash scripting for my course assignment.",
    fullDescription:"This project involved building a system to evaluate the accuracy of weather forecasts by comparing predicted data with actual weather conditions. I utilized Linux command-line tools and Bash scripting to automate the data collection, processing, and analysis. The system collected real-time weather data from APIs, logged historical temperature data, calculated forecast accuracy automatically, and generated weekly statistics for analysis.The project connects a self-hosted n8n workflow (running in Docker, tunneled via ngrok) to a WhatsApp interface, orchestrating conversation flow, memory retrieval, and AI response generation, backed by a FastAPI memory service and SQLite for persistence. It cleanly separates short-term conversation history from long-term structured memory, and combines semantic similarity with importance and confidence scores to decide which memories are actually relevant enough to inject into the agent's context.",
    contributionType: "Individual Project",
    technologies: ["Bash", "Linux", "Curl", "Text processing tools (grep, awk, cut)"],
    keyFeatures: [
      "Collected real-time weather data using APIs",
      "Logged historical temperature data",
      "Calculated forecast accuracy automatically",
      "Generated weekly statistics for analysis",
    ],
    link: "#",
    githubLink: "https://github.com/Nadeeshan-n/weather-forecast-project",
    imageKey: "weather",
    image: weatherImg,
  },
  {
    title: "AI-Agent Memory System",
    desc: "Structured long-term memory system for an AI agent using FastAPI, SQLite, embeddings, and n8n.",
    fullDescription:
      "AI Agent Memory System is a structured, long-term memory architecture built for conversational AI agents, designed so an agent can retain and recall meaningful information about a user across multiple conversations instead of starting fresh every time. Rather than treating memory as raw conversation text, the system models each memory as a structured record — with fields like category, key, value, importance, confidence, and embedding — enabling reliable creation, updating, deletion, semantic retrieval, and expiration of memories.",
    contributionType: "Individual Project",
    technologies: ["Python", "FastAPI", "Pydantic", "SQLite", "Hugging Face", "Operouter API", "n8n", "Docker", "ngrok", "NumPy", "WhatsApp"],
    keyFeatures: [
      "Structured memory model — each memory stored with category, key, value, source, importance, confidence, embedding, memory type, and timestamps (not raw text)",
      "Semantic retrieval — embeddings (Hugging Face) + cosine similarity (NumPy) surface memories by meaning, not exact keyword match",
      "Relevance scoring — combines similarity × importance × confidence, so low-quality matches don't get injected into context",
      "Full memory lifecycle — extraction → validation → create/update/delete → storage → retrieval → expiration → cleanup",
      "CRUD-based memory actions — CREATE, UPDATE, DELETE with duplicate detection to avoid redundant records",
      "Temporary vs. long-term memory — supports expiring memories that are automatically filtered out once expired",
      "Separation of conversation history and long-term memory — recent chat context and durable user facts are handled as two distinct systems",
      "Retrieval filtering — similarity thresholds, expiration, ownership, and embedding validity checks reduce irrelevant context and token usage",
      "FastAPI memory service — REST API layer handling all memory CRUD, scoring, and conversation storage, decoupled from the agent workflow",
      "n8n + Docker + ngrok pipeline — self-hosted workflow orchestration containerized in Docker, exposed via ngrok for WhatsApp webhook integration",
      "Fault-tolerant retrieval — invalid/corrupted embeddings are skipped rather than breaking the whole retrieval process"
    ],
    link: "#",
    githubLink: "https://github.com/Nadeeshan-n/ai-agent-memory-system",
    imageKey: "aiAgent",
    image: aiAgentImg,
  },
  {
    title: "Drive Smart - Car Rental Management System",
    desc: "This system is designed mainly for company-side management, where staff members handle vehicle rentals, customer information, and rental records through a local interface.",
    fullDescription:
      "Drive Smart is a car rental management system built with Java and csv File Systems, designed to streamline the rental process for both customers and staff. The system allows customers to browse available vehicles, make reservations, and manage their bookings through a user friendly interface. On the company side, staff members can efficiently handle vehicle rentals, customer information, and rental records through a local interface.",
    contributionType: "Group Project",
    technologies: ["Java", "File Handling", "Java Collections & Generics"],
    keyFeatures: [
      "Vehicle registration and management",
      "Customer registration and management",
      "Rental booking and return handling",
      "Vehicle availability tracking",
      "Rental record management",
      "Exception handling for safer operations",
    ],
    link: "#",
    githubLink: "https://github.com/Nadeeshan-n/Drive-Smart-System",
    imageKey: "driveSmart",
    image: driveSmartImg,
  },
];

export const educationList = [
  {
    degree: "Bachelor of Information and Communication Technology",
    institutionLink: "https://tech.sjp.ac.lk/",
    institution: "University of Sri Jayewardenepura, Sri Lanka",
    period: "2024 - Present",
    description:
      "Focusing on Software Engineering, DevOps, and scalable distributed systems. Maintaining a strong academic record while actively participating in tech communities.",
    image:
      "https://www.buhave.com/guide/wp-content/uploads/2025/05/University-of-Sri-Jayewardenepura.webp",
  },
  {
    degree: "Linx Commands and Shell Scripting Certification",
    institution: "Completed: Hands-on Introduction to Linux Commands and Shell Scripting on Coursera.",
    institutionLink: "https://www.coursera.org/account/accomplishments/verify/Y4M0EXWL5LZS?utm_source=ln&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=course",
    period: "2026",
    description:
      "Physical Science stream with a strong emphasis on Mathematics and Physics, providing a solid foundation for computational logic.",
    image:
      "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~Y4M0EXWL5LZS/CERTIFICATE_LANDING_PAGE~Y4M0EXWL5LZS.jpeg",
  },
];

export const allSkills = [
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
];

export const contactLinks = [
  { platform: "GitHub", handle: "github.com/Nadeeshan-n", link: "https://github.com/Nadeeshan-n", icon: "Github" },
  { platform: "LinkedIn", handle: "linkedin.com/in/nadeeshan-nadeera", link: "https://www.linkedin.com/in/nadeeshan-nadeera-7390a52aa/", icon: "Linkedin" },
  { platform: "Facebook", handle: "facebook.com/nadeeshan.nadeera.5", link: "https://www.facebook.com/nadeeshan.nadeera.5", icon: "Facebook" },
  { platform: "Email", handle: "nadeeshannadeera14@gmail.com", link: "mailto:nadeeshannadeera14@gmail.com", icon: "Mail" },
];
