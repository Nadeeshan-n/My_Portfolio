import weatherImg from '../assets/weather.jpg';
import driveSmartImg from '../assets/drive_smart.png';
import aiAgentImg from '../assets/AI-Agent.jpg';
import adminProjectImage3 from '../assets/admin-campusfind-1788624086763-3.png';
import adminProjectImage4 from '../assets/admin-drive-smart-2-0-1788624087917-4.png';

export const projectList = [
  {
    title: "Weather Forecast Accuracy Project",
    desc: "I built a Weather Forecast Accuracy System using Linux and Bash scripting for my course assignment.",
    fullDescription: "This project involved building a system to evaluate the accuracy of weather forecasts by comparing predicted data with actual weather conditions. I utilized Linux command-line tools and Bash scripting to automate the data collection, processing, and analysis. The system collected real-time weather data from APIs, logged historical temperature data, calculated forecast accuracy automatically, and generated weekly statistics for analysis.The project connects a self-hosted n8n workflow (running in Docker, tunneled via ngrok) to a WhatsApp interface, orchestrating conversation flow, memory retrieval, and AI response generation, backed by a FastAPI memory service and SQLite for persistence. It cleanly separates short-term conversation history from long-term structured memory, and combines semantic similarity with importance and confidence scores to decide which memories are actually relevant enough to inject into the agent's context.",
    contributionType: "Individual Project",
    technologies: ["Bash","Linux","Curl","Text processing tools (grep, awk, cut)"],
    keyFeatures: ["Collected real-time weather data using APIs","Logged historical temperature data","Calculated forecast accuracy automatically","Generated weekly statistics for analysis"],
    link: "#",
    githubLink: "https://github.com/Nadeeshan-n/weather-forecast-project",
    image: weatherImg,
  },
  {
    title: "AI-Agent Memory System",
    desc: "Structured long-term memory system for an AI agent using FastAPI, SQLite, embeddings, and n8n.",
    fullDescription: "AI Agent Memory System is a structured, long-term memory architecture built for conversational AI agents, designed so an agent can retain and recall meaningful information about a user across multiple conversations instead of starting fresh every time. Rather than treating memory as raw conversation text, the system models each memory as a structured record — with fields like category, key, value, importance, confidence, and embedding — enabling reliable creation, updating, deletion, semantic retrieval, and expiration of memories.",
    contributionType: "Individual Project",
    technologies: ["Python","FastAPI","Pydantic","SQLite","Hugging Face","Operouter API","n8n","Docker","ngrok","NumPy","WhatsApp"],
    keyFeatures: ["Structured memory model — each memory stored with category, key, value, source, importance, confidence, embedding, memory type, and timestamps (not raw text)","Semantic retrieval — embeddings (Hugging Face) + cosine similarity (NumPy) surface memories by meaning, not exact keyword match","Relevance scoring — combines similarity × importance × confidence, so low-quality matches don't get injected into context","Full memory lifecycle — extraction → validation → create/update/delete → storage → retrieval → expiration → cleanup","CRUD-based memory actions — CREATE, UPDATE, DELETE with duplicate detection to avoid redundant records","Temporary vs. long-term memory — supports expiring memories that are automatically filtered out once expired","Separation of conversation history and long-term memory — recent chat context and durable user facts are handled as two distinct systems","Retrieval filtering — similarity thresholds, expiration, ownership, and embedding validity checks reduce irrelevant context and token usage","FastAPI memory service — REST API layer handling all memory CRUD, scoring, and conversation storage, decoupled from the agent workflow","n8n + Docker + ngrok pipeline — self-hosted workflow orchestration containerized in Docker, exposed via ngrok for WhatsApp webhook integration","Fault-tolerant retrieval — invalid/corrupted embeddings are skipped rather than breaking the whole retrieval process"],
    link: "#",
    githubLink: "https://github.com/Nadeeshan-n/ai-agent-memory-system",
    image: aiAgentImg,
  },
  {
    title: "Drive Smart - Car Rental Management System",
    desc: "This system is designed mainly for company-side management, where staff members handle vehicle rentals, customer information, and rental records through a local interface.",
    fullDescription: "Drive Smart is a car rental management system built with Java and csv File Systems, designed to streamline the rental process for both customers and staff. The system allows customers to browse available vehicles, make reservations, and manage their bookings through a user friendly interface. On the company side, staff members can efficiently handle vehicle rentals, customer information, and rental records through a local interface.",
    contributionType: "Group Project",
    technologies: ["Java","File Handling","Java Collections & Generics"],
    keyFeatures: ["Vehicle registration and management","Customer registration and management","Rental booking and return handling","Vehicle availability tracking","Rental record management","Exception handling for safer operations"],
    link: "#",
    githubLink: "https://github.com/Nadeeshan-n/Drive-Smart-System",
    image: driveSmartImg,
  },
  {
    title: "CampusFind",
    desc: "A university Lost & Found web application that helps students report, discover, and recover lost items through intelligent matching and real-time-style messaging.",
    fullDescription: "CampusFind is a modern university Lost & Found web application designed to make reporting and recovering lost items easier for students. Users can submit lost or found item reports with details such as category, description, color, brand, location, date, time, and an optional photo.\n\nThe application includes a searchable and filterable marketplace of active lost and found reports. Its automated matching engine compares reports using a weighted scoring algorithm based on category, location proximity, description keywords, and additional item attributes to identify potential matches.\n\nUsers can manage their submitted reports through a dedicated My Reports section, track report statuses, and communicate with other users through in-thread messaging. An administrative dashboard provides tools for managing reports, updating statuses, searching, filtering, sorting, and removing inappropriate or outdated listings.\n\nThe current version uses browser localStorage for client-side data persistence and includes mock seed data for demonstration and development.",
    contributionType: "Individual Project",
    technologies: ["React 19","TypeScript","Vite 6","React Router 7","Tailwind CSS 4","Lucide React","Motion","Browser localStorage"],
    keyFeatures: ["Report lost and found items","Search and filter active reports","Automated lost-and-found matching engine","Weighted match scoring algorithm","Category-based item matching","Location proximity matching","Description keyword matching","Additional attribute matching","Item details and potential matches","My Reports management","Report status tracking","In-thread messaging","Admin dashboard","Admin report search and filtering","Admin report status management","Report removal and moderation","Responsive modern user interface","Browser-based data persistence","Mock seed data for demonstration"],
    link: "#",
    githubLink: "https://github.com/Nadeeshan-n/Find-and-report-web-app",
    image: adminProjectImage3,
  },
  {
    title: "Drive Smart 2.0",
    desc: "A Windows desktop vehicle rental and fleet management system for managing vehicles, customers, payments, maintenance, employees, and operational reports.",
    fullDescription: "Drive Smart 2.0 is a Windows desktop vehicle rental and fleet management application designed to centralize day-to-day rental operations into a single system.\n\nThe application provides secure employee authentication with session handling and role-based permissions for Admin, Manager, and Staff users. It includes dedicated modules for vehicle registration and browsing, customer management, payments and billing, vehicle maintenance, dashboards, and operational reporting.\n\nThe system uses SQLite databases for its major modules and Entity Framework Core for data access and migrations. It also provides PDF reporting and export capabilities, allowing operational data such as vehicle, maintenance, and payment information to be generated into professional reports.\n\nThe application was developed as a structured WPF desktop solution using C# and .NET 8, with reusable views and controls organized by functional module.Drive Smart 2.0 is a Windows desktop vehicle rental and fleet management application designed to centralize day-to-day rental operations into a single system.\n\nThe application provides secure employee authentication with session handling and role-based permissions for Admin, Manager, and Staff users. It includes dedicated modules for vehicle registration and browsing, customer management, payments and billing, vehicle maintenance, dashboards, and operational reporting.\n\nThe system uses SQLite databases for its major modules and Entity Framework Core for data access and migrations. It also provides PDF reporting and export capabilities, allowing operational data such as vehicle, maintenance, and payment information to be generated into professional reports.\n\nThe application was developed as a structured WPF desktop solution using C# and .NET 8, with reusable views and controls organized by functional module.",
    contributionType: "Group Project",
    technologies: ["C#",".NET 8","WPF","XAML","SQLite","Entity Framework Core","BCrypt.Net","QuestPDF","ClosedXML","LiveChartsCore","Visual Studio 2022"],
    keyFeatures: ["Employee authentication","Employee registration","Session management","Role-based access control","Admin permissions","Manager permissions","Staff permissions","Vehicle registration","Vehicle browsing","Vehicle management","Vehicle maintenance tracking","Customer management","Payment management","Billing and bill printing","Dashboard analytics","Operational reports","PDF report generation","Excel data export","SQLite database integration","Entity Framework Core migrations","Modular WPF architecture"],
    link: "#",
    githubLink: "https://github.com/Nadeeshan-n/Drive-Smart-2.0-",
    image: adminProjectImage4,
  },
  {
    title: "Personal Task MCP Server",
    desc: "Built a local Personal Task MCP Server to learn how Model Context Protocol connects AI applications with tools, resources, and task data.",
    fullDescription: "This project was built as a hands-on learning project to understand the Model Context Protocol (MCP) from the ground up. I developed a local Python-based MCP server that provides task-management capabilities and connected it with custom MCP clients, Gemini, and a Google ADK agent.\n\nThe project demonstrates the complete flow from a natural-language user request to an AI model, MCP client, MCP server, MCP tool, local task data, and the returned result. The server exposes task-management tools such as add_task, list_tasks, complete_task, delete_task, and search_tasks.\n\nI also implemented MCP resources and prompts to understand the different capabilities provided by MCP. The project includes the tasks://all resource for accessing task data and a daily_task_review prompt for AI-assisted task review.\n\nThe project progressively explores MCP concepts through a basic client-server implementation, Gemini integration, and Google ADK integration using McpToolset. Local communication is handled using stdio, while tasks are stored in a simple JSON file to keep the focus on learning MCP rather than database engineering.\n\nThis project helped me understand how MCP can serve as a standardized integration layer between AI agents and external tools or systems.",
    contributionType: "Individual Project",
    technologies: ["Python","Model Context Protocol (MCP)","Gemini","Google ADK","McpToolset","JSON","stdio"],
    keyFeatures: ["Local Python-based MCP server","MCP tool implementation","Task creation and management","Task search functionality","MCP resource implementation","MCP prompt implementation","Custom MCP client","Tool discovery and tool invocation","Gemini + MCP integration","Google ADK + MCP integration","stdio-based local communication","JSON-based local task storage"],
    link: "#",
    githubLink: "https://github.com/Nadeeshan-n/Personal-Task-MCP-Server",
    image: "",
  },
];

export const educationList = [
  {
    "degree": "Bachelor of Information and Communication Technology",
    "institutionLink": "https://tech.sjp.ac.lk/",
    "institution": "University of Sri Jayewardenepura, Sri Lanka",
    "period": "2024 - Present",
    "description": "Focusing on Software Engineering, DevOps, and scalable distributed systems. Maintaining a strong academic record while actively participating in tech communities.",
    "image": "https://www.buhave.com/guide/wp-content/uploads/2025/05/University-of-Sri-Jayewardenepura.webp"
  },
  {
    "degree": "Linx Commands and Shell Scripting Certification",
    "institutionLink": "https://www.coursera.org/account/accomplishments/verify/Y4M0EXWL5LZS?utm_source=ln&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=course",
    "institution": "Completed: Hands-on Introduction to Linux Commands and Shell Scripting on Coursera.",
    "period": "2026",
    "description": "Physical Science stream with a strong emphasis on Mathematics and Physics, providing a solid foundation for computational logic.",
    "image": "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~Y4M0EXWL5LZS/CERTIFICATE_LANDING_PAGE~Y4M0EXWL5LZS.jpeg"
  }
];

export const allSkills = [
  {
    "name": "JavaScript",
    "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
  },
  {
    "name": "React",
    "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
  },
  {
    "name": "Python",
    "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
  },
  {
    "name": "Docker",
    "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
  },
  {
    "name": "Git",
    "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
  },
  {
    "name": "Linux",
    "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
  },
  {
    "name": "C",
    "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg"
  },
  {
    "name": "Java",
    "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
  },
  {
    "name": "C#",
    "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg"
  },
  {
    "name": "SQL",
    "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
  },
  {
    "name": "HTML",
    "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
  },
  {
    "name": "CSS",
    "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
  }
];

export const contactLinks = [
  {
    "platform": "GitHub",
    "handle": "github.com/Nadeeshan-n",
    "link": "https://github.com/Nadeeshan-n",
    "icon": "Github"
  },
  {
    "platform": "LinkedIn",
    "handle": "linkedin.com/in/nadeeshan-nadeera",
    "link": "https://www.linkedin.com/in/nadeeshan-nadeera-7390a52aa/",
    "icon": "Linkedin"
  },
  {
    "platform": "Facebook",
    "handle": "facebook.com/nadeeshan.nadeera.5",
    "link": "https://www.facebook.com/nadeeshan.nadeera.5",
    "icon": "Facebook"
  },
  {
    "platform": "Email",
    "handle": "nadeeshannadeera14@gmail.com",
    "link": "mailto:nadeeshannadeera14@gmail.com",
    "icon": "Mail"
  }
];
