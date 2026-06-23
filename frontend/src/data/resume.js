export const profile = {
  name:     "Ramesh Rangarao Patil",
  title:    "Software Engineer",
  tagline:  "Backend & Applied AI Engineer",
  summary:  "Backend and Applied AI Engineer with 2+ years of experience designing and deploying production-grade ML systems, GenAI infrastructure, and scalable microservices backends. Proficient in Python and FastAPI, with deep expertise in ML inference, vector search, RAG architectures, agentic orchestration, and ML observability. Experienced in taking end-to-end ownership — from researching third-party integrations and designing ML pipelines to production deployment, drift monitoring, and automated retraining.",
  email:    "patilrameshrangarao@gmail.com",
  phone:    "+91 8793388503",
  linkedin: "https://linkedin.com/in/rameshrpatil",
  github:   "https://github.com/Rameshrpatil",
  location: "Pune, Maharashtra, India",
  initials: "RP",
};

export const stats = [
  { value: "2.5",      label: "Years of Production Experience" },
  { value: "<100ms",  label: "Vector Retrieval Latency" },
  { value: "40%",     label: "API Response Time Reduction" },
  { value: "8.28",    label: "CGPA · B.E Computer Science" },
];

export const experience = [
  {
    company:  "Dynamisch IT Pvt. Ltd.",
    role:     "Software Engineer (AI/ML)",
    period:   "Jan 2024 – May 2026",
    location: "Pune, Maharashtra",
    current:  true,
    projects: [
      {
        name: "Event-Driven AI Orchestration & Graph RAG — Investigation App",
        tags: ["FastAPI", "RabbitMQ", "Celery", "Graph RAG", "Milvus", "Docker"],
        bullets: [
          "Designed a distributed, event-driven pipeline using FastAPI, RabbitMQ, and Celery to ingest multi-modal files (video, audio, and documents), orchestrating multiple ML models to produce structured Markdown artefacts for downstream systems.",
          "Built end-to-end ingestion pipelines enabling knowledge graph construction and Graph RAG-based retrieval; implemented production observability with latency tracking and error-rate alerting across the entire pipeline.",
        ],
      },
      {
        name: "Audio Fingerprinting & ML Inference Service — Wazzdat",
        tags: ["Python", "PyTorch", "Milvus", "Redis", "FastAPI", "CNN"],
        bullets: [
          "Architected a scalable microservices backend in FastAPI for real-time audio fingerprinting and music identification — functionally equivalent to Shazam — including advanced search techniques for matching streaming audio snippets.",
          "Designed and trained a custom CNN-based 128-dimensional embedding model, managing the complete ML lifecycle from data preparation and training to evaluation and deployment.",
          "Optimised large-scale vector search using Milvus (IVF/HNSW indexing) with Redis caching, achieving sub-100 ms retrieval latency; implemented request-level caching and routing to eliminate redundant inference calls.",
          "Developed a song recommendation system as an additional feature within the same service.",
        ],
      },
      {
        name: "ML Observability & Automated Retraining — Wazzdat",
        tags: ["ML Monitoring", "Drift Detection", "Milvus", "Python", "Alerting"],
        bullets: [
          "Built a standalone monitoring microservice to detect embedding drift and retrieval quality degradation in production; automated model retraining and Milvus index retuning triggered by drift signals with zero manual intervention.",
          "Developed evaluation pipelines to benchmark retrieval accuracy against gold-standard datasets, establishing measurable release criteria before each production rollout.",
        ],
      },
      {
        name: "Concert Events Platform — Wazzdat (Golang Admin & User Services)",
        tags: ["Golang", "Microservices", "Redis", "Cron", "Geospatial"],
        bullets: [
          "Took end-to-end ownership of the concert events feature: researched affiliate programmes, onboarded multi-platform provider APIs, and built Golang admin service modules with cron schedulers for continuous, fault-tolerant data ingestion.",
          "Implemented user service modules for concert discovery — geospatial filtering, city/genre-wise browsing, nearby events, trending algorithms, ticketing, and user interactions — with Redis caching reducing API response times by 40%.",
        ],
      },
      {
        name: "Healthcare RAG Chatbot & Data Visualisation Platform",
        tags: ["LangChain", "RAG", "LLM", "Stripe", "FastAPI", "2FA"],
        bullets: [
          "Developed a RAG-based chatbot using LangChain and the Google Gemini API with document ingestion, chunking, embedding, and vector retrieval pipelines; applied prompt engineering strategies to reduce hallucination rates.",
          "Built a secure backend platform with Stripe payment integration, OTP-based and Two-Factor Authentication (2FA), and data visualisation dashboards powered by Pandas and Matplotlib.",
          "Deployed Heroku schedulers for automated, scheduled data retrieval, ensuring up-to-date reporting across multiple business platforms, following CI/CD principles to streamline releases.",
        ],
      },
    ],
  },
];

export const workProjects = [
  {
    title:      "Event-Driven AI Orchestration & Graph RAG Pipeline",
    subtitle:   "Distributed AI Investigation Platform",
    category:   "Professional Experience",
    desc:       "Architected and implemented a distributed event-driven AI pipeline using FastAPI, RabbitMQ, and Celery to ingest and process multi-modal content including audio, video, and documents. Developed orchestration workflows for multiple ML models to generate structured Markdown artifacts and integrated Graph RAG-based retrieval with production-grade observability.",
    highlights: [
      "Designed distributed orchestration workflows using FastAPI, RabbitMQ, and Celery",
      "Enabled scalable ingestion and processing of multi-modal datasets",
      "Implemented Graph RAG pipelines with knowledge graph integration",
      "Built observability and alerting systems for latency and error-rate monitoring",
      "Developed scalable and fault-tolerant AI processing architecture",
    ],
    tags: [
      "Python", "FastAPI", "RabbitMQ", "Celery", "Graph RAG", "Knowledge Graph", "LLMs", "Observability", "AI Pipelines", "Redis"
    ],
    color: "#7c5cff",
  },
  {
    title:      "Audio Fingerprinting & ML Inference Service",
    subtitle:   "Wazzdat — Microservices Mobile Platform",
    category:   "Professional Experience",
    desc:       "Developed the core ML inference microservice for real-time audio fingerprinting and music recognition using FastAPI. Designed and trained a custom CNN-based 128-dimensional embedding model and optimized large-scale vector similarity search with Milvus and Redis to achieve high-performance retrieval.",
    highlights: [
      "Built a CNN-based embedding model for audio fingerprint generation",
      "Developed a real-time ML inference microservice using FastAPI",
      "Optimized vector search performance using Milvus IVF/HNSW indexing",
      "Achieved sub-100ms similarity retrieval latency at scale",
      "Implemented intelligent caching and request routing using Redis",
    ],
    tags: [
      "Python", "FastAPI", "CNN", "Deep Learning", "Milvus", "Redis", "Vector Search", "Audio Fingerprinting", "ML Inference", "Microservices"
    ],
    color: "#ff6b6b",
  },
  {
    title:      "ML Observability & Automated Retraining Service",
    subtitle:   "Wazzdat — AI Monitoring Infrastructure",
    category:   "Professional Experience",
    desc:       "Engineered an ML observability and monitoring service to detect embedding drift and retrieval quality degradation. Automated retraining workflows and Milvus index optimization based on drift signals, while establishing evaluation pipelines and measurable release benchmarks for production deployments.",
    highlights: [
      "Implemented embedding drift detection and retrieval quality monitoring",
      "Automated model retraining and vector index optimization workflows",
      "Designed zero-touch ML retraining and deployment mechanisms",
      "Developed evaluation pipelines using benchmark datasets",
      "Established production release validation and quality metrics",
    ],
    tags: [
      "Python", "ML Observability", "Milvus", "MLOps", "Model Monitoring", "Automation", "Vector Databases", "Evaluation Pipelines", "AI Infrastructure"
    ],
    color: "#14b8a6",
  },
  {
    title:      "Concert Events Platform",
    subtitle:   "Wazzdat — Golang Admin & User Services",
    category:   "Professional Experience",
    desc:       "Led the development of a concert events platform by integrating affiliate provider APIs and building scalable Golang-based admin and user services. Implemented geospatial event discovery, personalized browsing experiences, trending algorithms, and high-performance caching mechanisms.",
    highlights: [
      "Integrated multiple affiliate and provider APIs for event aggregation",
      "Built Golang admin services with cron-based ingestion pipelines",
      "Implemented geospatial filtering and nearby event recommendations",
      "Developed city-wise and genre-based event discovery features",
      "Improved API response performance by 40% using Redis caching",
    ],
    tags: [
      "Golang", "Redis", "Microservices", "Cron Jobs", "REST APIs", "Geospatial Search", "Caching", "Backend Engineering", "Event Discovery"
    ],
    color: "#f97316",
  },
  {
    title:      "Healthcare RAG Chatbot",
    subtitle:   "Generative AI & NLP",
    category:   "Earlier Projects",
    desc:       "Developed a healthcare-focused Retrieval-Augmented Generation (RAG) chatbot using LangChain and Google Gemini API. Built end-to-end document ingestion, chunking, embedding, and vector retrieval pipelines while applying prompt engineering strategies to improve contextual accuracy and reduce hallucinations.",
    highlights: [
      "Built an end-to-end RAG pipeline using LangChain",
      "Integrated Google Gemini API for conversational AI workflows",
      "Implemented document ingestion and vector embedding pipelines",
      "Applied prompt engineering techniques to improve response accuracy",
    ],
    tags: [
      "Python", "LangChain", "Google Gemini", "RAG", "LLMs", "Prompt Engineering", "Vector Databases", "NLP", "Generative AI"
    ],
    color: "#22c55e",
  },
  {
    title:      "Real-Time Stock Data Analyser",
    subtitle:   "Data Engineering",
    category:   "Professional POC",
    desc:       "Developed a Flask and Dash-based analytics platform integrated with Yahoo Finance APIs to fetch, process, and visualize real-time stock market data through interactive dashboards and analytical charts.",
    highlights: [
      "Integrated real-time market data using Yahoo Finance APIs",
      "Built interactive analytical dashboards using Dash",
      "Implemented efficient data processing workflows with Pandas",
      "Developed dynamic visualization components using Matplotlib and Seaborn",
    ],
    tags: [
      "Python", "Flask", "Dash", "Pandas", "Matplotlib", "Seaborn", "yfinance"
    ],
    color: "#5b9cf6",
  },
  {
    title:      "Elevated Revenue — Sales & Analytics Platform",
    subtitle:   "Full-Stack Backend",
    category:   "Professional POC",
    desc:       "Contributed to the development of a sales and revenue analytics platform by integrating multiple enterprise data sources including HubSpot and Stripe. Enhanced data visualization, reporting automation, and platform security through scalable backend services.",
    highlights: [
      "Integrated enterprise platforms including HubSpot and Stripe",
      "Implemented JWT, OTP, and Two-Factor Authentication (2FA)",
      "Automated reporting workflows using scheduled background jobs",
      "Developed real-time dashboards with CI/CD-enabled deployment pipelines",
    ],
    tags: [
      "Python", "Stripe", "HubSpot", "Pandas", "JWT", "2FA", "CI/CD", "Heroku"
    ],
    color: "#e8a042",
  },
];

export const personalProjects = [
  {
  title:      "ObserveAI",
  subtitle:   "Autonomous AIOps Platform",
  category:   "Personal R&D",
  desc:       "An AI-driven observability and self-healing platform that leverages LLMs, OpenTelemetry, and multi-agent orchestration to detect anomalies, perform root cause analysis, and autonomously remediate incidents across distributed microservices.",
  highlights: [
  "Real-time anomaly detection from logs and distributed traces",
  "Dynamic service dependency discovery and blast-radius analysis",
  "RAG-powered incident intelligence using historical remediation knowledge",
  "Autonomous Docker and Kubernetes remediation with safety guardrails",
  ],
  tags: [
  "Python",
  "FastAPI",
  "LLMs",
  "OpenTelemetry",
  "RAG",
  "Kubernetes",
  "Docker",
  "Agentic AI"
  ],
  color: "#4f8cff",
  },
  {
    title:      "Geospatial Aerial Land Cover Segmentation",
    subtitle:   "Computer Vision · Geospatial AI",
    category:   "Personal R&D",
    desc:       "Designed and built an end-to-end aerial land cover segmentation model using U-Net, enabling accurate semantic classification of roads, urban areas, green vegetation, and water bodies from geospatial imagery.",
    highlights: [
      "U-Net architecture for pixel-level semantic segmentation",
      "Classification of roads, urban zones, vegetation, and water bodies",
      "End-to-end geospatial imagery processing pipeline",
      "Designed for scalability towards aerospace and defence applications",
    ],
    tags:  ["Python", "PyTorch", "U-Net", "Deep Learning", "Geospatial", "Semantic Segmentation"],
    color: "#5b9cf6",
  },
  {
    title:      "Resume ATS Scorer & Optimiser",
    subtitle:   "Agentic AI",
    category:   "Personal R&D",
    desc:       "An agentic AI system powered by LLMs to score job-fit alignment, benchmark ATS parsing quality, and generate structured candidate assessment reports with cross-version evaluation metrics.",
    highlights: [
      "LLM-powered job-fit scoring against job descriptions",
      "ATS parsing quality benchmarking with evaluation metrics",
      "OCR pipeline for resume content extraction and grammar refinement",
      "Auto-generated interview questions tailored to resume–job alignment",
    ],
    tags:  ["Python", "LLMs", "OCR", "Eval Pipelines", "Agentic AI"],
    color: "#e8a042",
  },
  {
    title:      "Agentic AI Suite",
    subtitle:   "Multi-Agent Orchestration",
    category:   "Personal R&D",
    desc:       "A suite of autonomous AI agents built using the Agno library, encompassing a RAG-based knowledge chatbot, an automated PDF summariser, and a context-aware email generator — all with multi-step orchestration, safety guardrails, and structured output validation.",
    highlights: [
      "RAG-based knowledge chatbot with document retrieval",
      "Automated PDF summarisation agent",
      "Context-aware email generator for productivity",
      "Safety guardrails and structured output validation",
    ],
    tags:  ["Python", "Agno", "RAG", "LangChain", "LLMs"],
    color: "#52c97a",
  },
  {
    title:      "Vehicle Number Plate Parser",
    subtitle:   "Computer Vision · OCR",
    category:   "Personal R&D",
    desc:       "Developed a proof-of-concept for number plate detection and vehicle number extraction, training a YOLOv8 model on a custom dataset of 2,000+ annotated vehicle images and integrating OCR to extract plate text from cropped detections.",
    highlights: [
      "YOLOv8 object detector trained on 2,000+ annotated images",
      "Integrated OCR pipeline for text extraction from detections",
      "End-to-end inference: detect → crop → parse",
      "Suitable for traffic management and parking automation use cases",
    ],
    tags:  ["Python", "YOLOv8", "OCR", "PyTorch", "Computer Vision"],
    color: "#7c3aed",
  },
  {
    title:      "Song Recommendation via Facial Expression",
    subtitle:   "Deep Learning · Affective Computing",
    category:   "Personal R&D",
    desc:       "A machine learning project that recommends songs based on the user's detected facial expression, leveraging computer vision and deep learning to extract emotional cues and map them to music preferences.",
    highlights: [
      "CNN-based facial expression recognition achieving >80% accuracy",
      "Emotion-to-music mapping for personalised recommendations",
      "Extensive research into affective computing and music psychology",
      "End-to-end pipeline: face detection → emotion classification → recommendation",
    ],
    tags:  ["Python", "CNNs", "OpenCV", "Deep Learning", "Affective Computing"],
    color: "#ec4899",
  },
  {
    title:      "Customised Linux File System",
    subtitle:   "Systems Programming",
    category:   "Personal R&D",
    desc:       "Implemented a fully functional Linux-like file system in C, providing all core file system operations through a customised shell, complete with in-core data structures including the Inode Table, File Table, UAREA, and User File Descriptor Table.",
    highlights: [
      "Full Linux file system semantics — create, read, write, delete, link",
      "Custom shell with system call implementations",
      "Core data structures: Inode Table, File Table, UAREA, UFDT",
      "Demonstrates deep understanding of OS internals",
    ],
    tags:  ["C", "Systems Programming", "OS Internals", "Shell", "Linux"],
    color: "#f59e0b",
  },
];

export const education = [
  { school: "SKN Sinhgad Institute of Technology and Science", degree: "B.E. Computer Engineering (Honors in Robotics)", period: "Aug 2020 – Jul 2023", score: "CGPA: 8.28", location: "Pune, Maharashtra" },
  { school: "Dr. DY Patil School of Engineering (Polytechnic)", degree: "Diploma in Computer Engineering", period: "Jul 2017 – Oct 2020", score: "77.50%", location: "Pune, Maharashtra" },
];

export const skillProficiency = {
  "ML & AI":                [{ name: "PyTorch / Deep Learning", pct: 88 }, { name: "RAG & LLM Orchestration", pct: 92 }, { name: "ML Inference & Pipelines", pct: 90 }, { name: "LangChain / Agno", pct: 85 }],
  "Backend & Infra":        [{ name: "FastAPI / Python", pct: 95 }, { name: "Microservices Architecture", pct: 88 }, { name: "RabbitMQ / Celery", pct: 85 }, { name: "Golang", pct: 72 }],
  "Databases & Vector DB":  [{ name: "Milvus (IVF/HNSW)", pct: 90 }, { name: "Redis Caching", pct: 88 }, { name: "PostgreSQL / MongoDB", pct: 85 }, { name: "Elasticsearch", pct: 78 }],
  "MLOps & Observability":  [{ name: "Drift Detection & Monitoring", pct: 88 }, { name: "Automated Retraining", pct: 85 }, { name: "Evaluation Pipelines", pct: 87 }],
};

export const skills = {
  "ML & AI":               { icon: "🤖", desc: "Deep learning, LLM orchestration, RAG, and agentic AI systems.", items: ["PyTorch", "TensorFlow", "Hugging Face Transformers", "LangChain", "Scikit-learn", "ONNX", "RAG Architectures", "Graph RAG", "Agentic Orchestration", "Prompt Engineering", "Google Gemini API", "ML Inference"] },
  "Backend & Infra":       { icon: "⚙️", desc: "High-performance APIs, microservices, and event-driven distributed systems.", items: ["FastAPI", "Django", "Flask", "Golang", "Microservices", "REST APIs", "RabbitMQ", "Celery", "Docker", "CI/CD"] },
  "Databases & Vector DB": { icon: "🗄️", desc: "Relational, NoSQL, search, and vector databases for ML-scale workloads.", items: ["Milvus (IVF/HNSW)", "Elasticsearch", "PostgreSQL", "MySQL", "MongoDB", "Redis"] },
  "MLOps & Observability": { icon: "📊", desc: "Drift detection, automated retraining, evaluation pipelines, and production alerting.", items: ["ML Monitoring", "Drift Detection", "Evaluation Pipelines", "Automated Retraining", "Alerting Systems", "Latency Profiling"] },
  "Languages":             { icon: "💻", desc: "Core languages for systems, ML, and backend development.", items: ["Python", "Golang", "C", "C++"] },
  "Cloud & Tools":         { icon: "☁️", desc: "Cloud deployment, numerical computing, and version control.", items: ["AWS EC2", "AWS S3", "NumPy", "Pandas", "Matplotlib", "librosa", "Git", "Docker"] },
};

export const endorsements = [
  { text: "Ramesh consistently delivers robust, well-architected solutions. His work on our ML inference pipeline was exceptional — sub-100 ms latency in production speaks for itself.", author: "Senior Engineering Lead", role: "Dynamisch IT Pvt. Ltd." },
  { text: "What sets Ramesh apart is his end-to-end ownership. He researches, designs, ships, and monitors — a rare quality in engineers at his level of experience.", author: "Product Manager", role: "Dynamisch IT Pvt. Ltd." },
];
