# Ishaan Pathak — Portfolio

A modern, interactive personal portfolio built with **React, Vite, Tailwind CSS, Framer Motion, Three.js, and React Three Fiber**.

The portfolio is designed to present my experience, research interests, technical skills, projects, GitHub activity, resume, and contact information through an interactive space-themed interface.

## 🌐 Portfolio

**Live Portfolio:** [Add deployed portfolio URL]

**GitHub Repository:** https://github.com/ishaan175pathak/portfolio

---

## ✨ Overview

This portfolio is a single-page React application built around a dark, space-inspired visual system.

Rather than using a conventional static portfolio layout, the site combines interactive UI components with real-time visual effects to create an experience that reflects my interests in **AI/ML, computer vision, software engineering, and research**.

The application includes:

* Interactive space-themed background
* Real-time Three.js black-hole visualization
* Animated role/typewriter introduction
* Scrolling technical-skills marquee
* Animated professional experience timeline
* Interactive project cards with 3D flip effects
* Expandable research visualization
* Research publications and research areas
* GitHub contribution calendar with year selection
* Embedded resume viewer
* Resume PDF download
* Contact section with GitHub and email links
* Responsive layouts for different screen sizes
* Reduced-motion support for accessibility
* Performance optimizations for animation-heavy sections

---

## 🛠️ Tech Stack

### Frontend

* **React 19**
* **Vite**
* **Tailwind CSS 4**
* **JavaScript / JSX**

### Animation & Interaction

* **Framer Motion**
* CSS transitions and animations
* Custom Canvas-based starfield
* React state-driven interactions

### 3D Graphics

* **Three.js**
* **React Three Fiber**
* **@react-three/drei**
* **@react-three/postprocessing**
* Custom GLSL shaders
* Bloom post-processing

### Icons & UI

* **Lucide React**
* **React Icons**

### GitHub Integration

* **react-github-calendar**

### Development

* ESLint
* Vite development server
* npm

The project's dependency configuration includes React, Tailwind's Vite integration, Framer Motion, Lucide React, React Icons, React Three Fiber, Three.js, postprocessing, React Router DOM, and the GitHub calendar library.

---

## 🎨 Design & Architecture

The application follows a component-based React architecture.

The top-level application renders a shared `Layout`, which composes the major sections of the portfolio:

```text
App
└── Layout
    ├── Starfield
    ├── Navbar
    ├── AboutMe
    │   └── BlackHoleScene
    ├── Timeline
    ├── Research
    ├── Projects
    ├── GithubContributions
    ├── Resume
    ├── ContactMe
    └── Footer
```

The main layout keeps the portfolio sections separated into reusable components rather than placing the entire page inside a single React component.

---

## 🌌 Visual System

### Animated Starfield

The portfolio uses a custom HTML Canvas starfield rather than a static background image.

The implementation:

* Generates approximately 300 stars by default
* Animates their brightness using `requestAnimationFrame`
* Caps animation at approximately 30 FPS
* Stops animation when the document is hidden
* Responds to viewport resizing
* Detects `prefers-reduced-motion`
* Cleans up animation frames and event listeners when unmounted

This keeps the background visually dynamic while avoiding unnecessary work when the page is not visible.

### 3D Black Hole

The hero section contains a custom Three.js black-hole visualization implemented with React Three Fiber.

The scene includes:

* Procedurally generated accretion disk geometry
* Custom GLSL shader materials
* Animated turbulence/noise
* Differential rotation
* Relativistic-beaming-inspired lighting
* A lensed light ring
* Event-horizon geometry
* Bloom post-processing

The Three.js canvas also uses an `IntersectionObserver` to stop rendering when the scene is outside the viewport, reducing unnecessary GPU usage.

---

## 👋 About Section

The About section acts as the primary introduction to the portfolio.

It includes:

* Animated professional roles
* Typewriter effect
* Technical skills carousel
* AI/ML technologies
* Programming languages
* Web technologies
* Cloud and DevOps technologies
* Databases
* MLOps concepts

The role animation cycles through positions such as:

* AI/ML Engineer
* Computer Vision Engineer
* Machine Learning Researcher
* Machine Learning Engineer
* Software Engineer
* Generative AI Engineer
* Forward Deployed Engineer

The skills section uses an infinite Framer Motion marquee containing technologies represented through React Icons.

---

## 💼 Experience Timeline

Professional and research experience is presented through an animated alternating timeline.

Each experience entry contains:

* Role
* Organization
* Date range
* Description

The timeline uses Framer Motion to animate:

* Timeline expansion
* Experience cards
* Timeline markers
* Entry transitions

The experience section currently contains roles spanning research, web development, machine learning, data science, and design-related work.

---

## 🔬 Research

The Research section presents research interests through an interactive orbital visualization.

Current research areas include:

1. **Structural Health Monitoring**
2. **Generative AI Evaluation Strategies**
3. **Medical AI**
4. **Information Retrieval**

Each research area contains:

* Research summary
* Key work
* Technology/research tags
* Publications or project links where applicable

### Interactive Research Visualization

Research areas are represented as orbiting "planets" around a central Research element.

Users can:

1. Expand the Research section.
2. Select an individual research area.
3. View additional research highlights.
4. Explore associated publications or project links.

The expanded research cards use Framer Motion transitions and `AnimatePresence` for progressive content rendering.

---

## 🚀 Projects

Projects are displayed using interactive 3D flip cards.

Each card has:

### Front

* Project title
* Technology tags

### Back

* Project description
* Key highlights
* GitHub link

The project grid initially displays three projects and provides a **Show More / Show Less** control for the remaining projects.

Current featured projects include:

* Brain Tumor Detection with YOLOv11
* Personalized Search Reranker
* MedBot360 – AI Health Companion
* FinWise – AI Financial Advisor
* Anonymous Essay Grading Platform
* Learning to Summarize from Human Feedback

---

## 📊 GitHub Contributions

The portfolio includes an interactive GitHub contribution calendar powered by `react-github-calendar`.

Users can select from the current year and the previous seven years to explore GitHub activity.

The calendar is configured for the `ishaan175pathak` GitHub account and uses a custom dark-theme color palette.

---

## 📄 Resume

The Resume section provides three ways to access the resume:

* View the resume in a new browser tab
* Download the resume as a PDF
* View the PDF directly inside the portfolio

The resume is served from:

```text
public/Resume_Pathak_Ishaan.pdf
```

The embedded PDF is lazy-loaded to avoid loading it unnecessarily before the section is needed.

---

## 📬 Contact

The Contact section provides direct links for:

* Email
* LinkedIn
* GitHub

It also displays the email address directly for easy access.

> **Note:** The LinkedIn URL should be updated with the final profile URL before deployment if it has not already been changed.

---

## 📁 Project Structure

The project follows a component-oriented React structure:

```text
portfolio/
├── data/
├── public/
│   └── Resume_Pathak_Ishaan.pdf
├── src/
│   ├── components/
│   │   ├── AboutMe.jsx
│   │   ├── Blackhole.jsx
│   │   ├── ContactMe.jsx
│   │   ├── Footer.jsx
│   │   ├── GithubContributions.jsx
│   │   ├── Logo.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   ├── Research.jsx
│   │   ├── Resume.jsx
│   │   ├── Starfield.jsx
│   │   └── Timeline.jsx
│   ├── layouts/
│   │   └── Layout.jsx
│   ├── styles/
│   │   ├── global.css
│   │   └── tailwind.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── Resume_Pathak_Ishaan.pdf
└── README.md
```

The main application entry point imports the global styles and renders the React application through `StrictMode`.

---

## ⚙️ Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

### Clone the Repository

```bash
git clone https://github.com/ishaan175pathak/portfolio.git
cd portfolio
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Vite will start the development server and provide the local URL in the terminal.

---

## 🏗️ Production Build

Create an optimized production build with:

```bash
npm run build
```

Preview the production build locally with:

```bash
npm run preview
```

Run ESLint with:

```bash
npm run lint
```

These scripts are defined in the project's `package.json`.

---

## 🎯 Implementation Roadmap

The project was originally developed in several phases.

| Phase             | Implementation                                                                    |
| ----------------- | --------------------------------------------------------------------------------- |
| Foundation        | React + Vite project setup and dependency configuration                           |
| Global Theme      | Space-themed visual system and global styling                                     |
| Content Structure | Portfolio experience, research, projects, skills, and resume content              |
| About             | Interactive hero section with typewriter roles, skills marquee, and 3D black hole |
| Experience        | Animated alternating timeline                                                     |
| Projects          | Interactive project cards with flip animations                                    |
| Research          | Interactive orbital research visualization                                        |
| GitHub            | Contribution calendar with historical year selection                              |
| Resume            | Embedded PDF viewer and download functionality                                    |
| Contact           | Email, GitHub, and LinkedIn contact actions                                       |

The original project plan identified **RAG integration as the future phase**, after the portfolio UI and structured content had been completed.

---

## 🔮 Future Development — RAG Portfolio Agent

The remaining planned phase is the integration of a **Retrieval-Augmented Generation (RAG) agent**.

The goal is to allow visitors to interact with an AI assistant that can answer questions about the portfolio using the portfolio's own information as its knowledge source.

### Planned Architecture

```text
Portfolio Content
       │
       ▼
Structured Portfolio Data
       │
       ▼
Document Processing
       │
       ▼
Embeddings
       │
       ▼
Vector Database
       │
       ▼
Retriever
       │
       ▼
RAG / LLM Agent
       │
       ▼
Portfolio Chat Interface
```

Potential questions could include:

* "What computer vision research has Ishaan worked on?"
* "Tell me about his search reranking project."
* "What experience does he have with TensorFlow?"
* "Which projects involve generative AI?"
* "What publications has he worked on?"
* "What technologies does he use for MLOps?"

The existing separation between portfolio content and UI components provides a foundation for eventually indexing portfolio information for retrieval. The original planning document specifically identified structured portfolio content as preparation for this future RAG integration.

### Planned RAG Components

The future implementation can be divided into:

1. **Content ingestion**

   * Experience
   * Projects
   * Research
   * Publications
   * Skills
   * Resume

2. **Document processing**

   * Convert portfolio information into retrieval-friendly documents
   * Attach metadata such as project, research area, technology, and experience

3. **Embedding pipeline**

   * Generate vector representations of portfolio content

4. **Vector storage**

   * Store and retrieve relevant portfolio information efficiently

5. **RAG agent**

   * Retrieve relevant portfolio context
   * Provide that context to an LLM
   * Generate grounded responses

6. **Portfolio chat UI**

   * Integrate the assistant directly into the existing portfolio experience

This phase is intentionally left as future work; the current portfolio is a completed frontend experience.

---

## 🧠 Performance Considerations

Because the portfolio contains several animation-heavy components, performance was considered during implementation.

Examples include:

* Starfield animation capped at approximately 30 FPS
* Starfield animation paused when the document is hidden
* Reduced-motion support
* React memoization for reusable visual components
* Lazy loading of the embedded resume PDF
* `content-visibility: auto` for larger portfolio sections
* Intersection Observer used to stop the Three.js scene when it is outside the viewport
* High-performance WebGL configuration for the 3D scene

The global styles also use `content-visibility: auto` for major sections to reduce unnecessary rendering work before those sections become visible.

---

## 📜 License

This project is a personal portfolio created by **Ishaan Pathak**.

Unless otherwise stated, the portfolio content, personal information, resume, and original visual implementations are intended for personal use and should not be redistributed without permission.

---

## 👤 Author

### Ishaan Pathak

AI/ML Engineer • Computer Vision Engineer • Machine Learning Researcher • Software Engineer

* **GitHub:** https://github.com/ishaan175pathak
* **Email:** [ishaan175pathak@gmail.com](mailto:ishaan175pathak@gmail.com)
* **LinkedIn:** [Add/verify LinkedIn URL]

---

## 🚀 Project Status

**Status: Completed**

The portfolio's planned frontend implementation is complete.

The only remaining planned development phase is:

> **RAG-powered portfolio assistant**
