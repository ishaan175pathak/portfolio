import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiC,
  SiCplusplus,
  SiPytorch,
  SiTensorflow,
  SiKeras,
  SiScikitlearn,
  SiHuggingface,
  SiLangchain,
  SiOpencv,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiDjango,
  SiSpringboot,
  SiThreedotjs,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiGraphql,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiJenkins,
  SiApachekafka,
} from "react-icons/si";

import {
  FaBrain,
  FaEye,
  FaRobot,
  FaMagnifyingGlass,
  FaDatabase,
  FaCloud,
  FaAws,
  FaCodeBranch,
  FaJava,
} from "react-icons/fa6";

import BlackHoleScene from "./Blackhole";

const roles = [
  "AI/ML Engineer",
  "Computer Vision Engineer",
  "Machine Learning Researcher",
  "Machine Learning Engineer",
  "Software Engineer",
  "Generative AI Engineer",
  "Forward Deployed Engineer",
];

const skills = [
  // AI / Machine Learning
  { name: "Machine Learning", icon: FaBrain },
  { name: "Deep Learning", icon: FaBrain },
  { name: "Computer Vision", icon: FaEye },
  { name: "Data Science", icon: FaDatabase },

  // ML Frameworks
  { name: "PyTorch", icon: SiPytorch },
  { name: "TensorFlow", icon: SiTensorflow },
  { name: "Keras", icon: SiKeras },
  { name: "Scikit-learn", icon: SiScikitlearn },
  { name: "Hugging Face", icon: SiHuggingface },
  { name: "OpenCV", icon: SiOpencv },

  // Generative AI
  { name: "Generative AI", icon: FaRobot },
  { name: "LangChain", icon: SiLangchain },
  { name: "RAG", icon: FaDatabase },
  { name: "AI Agents", icon: FaRobot },
  { name: "Semantic Search", icon: FaMagnifyingGlass },

  // Programming Languages
  { name: "Python", icon: SiPython },
  { name: "Java", icon: FaJava },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "C", icon: SiC },
  { name: "C++", icon: SiCplusplus },
  { name: "SQL", icon: SiMysql },

  // Web Development
  { name: "React", icon: SiReact },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express.js", icon: SiExpress },
  { name: "Flask", icon: SiFlask },
  { name: "Django", icon: SiDjango },
  { name: "Spring Boot", icon: SiSpringboot },
  { name: "Three.js", icon: SiThreedotjs },

  // Cloud / DevOps
  { name: "AWS", icon: FaAws },
  { name: "Docker", icon: SiDocker },
  { name: "Kubernetes", icon: SiKubernetes },
  { name: "CI/CD", icon: FaCodeBranch },
  { name: "GitHub Actions", icon: SiGithubactions },
  { name: "Jenkins", icon: SiJenkins },
  { name: "Kafka", icon: SiApachekafka },

  // Databases
  { name: "MySQL", icon: SiMysql },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Oracle", icon: FaDatabase },
  { name: "Redis", icon: SiRedis },
  { name: "GraphQL", icon: SiGraphql },

  // MLOps / DevOps concepts
  { name: "MLOps", icon: FaRobot },
  { name: "DevOps", icon: FaCloud },
];

const CARD_WIDTH = 170; // approx card width + gap, in px
const SPEED = 60; // px per second, lower = slower
const LOOP_DURATION = (skills.length * CARD_WIDTH) / SPEED;

// Static animation config, hoisted so framer-motion gets stable references
const MARQUEE_ANIMATE = { x: ["0%", "-50%"] };
const MARQUEE_TRANSITION = {
  duration: LOOP_DURATION,
  ease: "linear",
  repeat: Infinity,
};
const CURSOR_ANIMATE = { opacity: [1, 0, 1] };
const CURSOR_TRANSITION = { duration: 0.9, repeat: Infinity };

// No backdrop-blur: re-blurring ~90 moving cards over a live WebGL canvas
// every frame is very expensive. A more opaque background looks similar.
const SkillCard = memo(({ skill }) => {
  const Icon = skill.icon;
  return (
    <div className="flex min-w-[150px] shrink-0 items-center gap-3 rounded-xl border border-white/10 bg-black/60 px-5 py-4">
      <Icon className="text-2xl" />
      <span className="whitespace-nowrap text-sm font-medium">{skill.name}</span>
    </div>
  );
});

// Rendered once; the two copies make the -50% loop seamless.
const SkillsGroup = memo(() => (
  <div className="flex shrink-0 gap-4">
    {skills.map((skill, i) => (
      <SkillCard key={`${skill.name}-${i}`} skill={skill} />
    ))}
  </div>
));

const fadeMask = {
  maskImage:
    "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
};

// Typewriter state lives here so each keystroke re-renders only this heading,
// not the black hole scene or the skills carousel.
const Typewriter = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let pause;

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          const next = currentRole.substring(0, text.length + 1);
          setText(next);
          if (next === currentRole) {
            pause = setTimeout(() => setIsDeleting(true), 1400);
          }
        } else {
          const next = currentRole.substring(0, text.length - 1);
          setText(next);
          if (next === "") {
            setIsDeleting(false);
            setRoleIndex((i) => (i + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 90
    );

    return () => {
      clearTimeout(timer);
      clearTimeout(pause);
    };
  }, [text, isDeleting, roleIndex]);

  return (
    <h2 className="text-5xl font-bold tracking-tight drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]">
      {text}
      <motion.span animate={CURSOR_ANIMATE} transition={CURSOR_TRANSITION}>
        |
      </motion.span>
    </h2>
  );
};

const AboutMe = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-transparent text-white"
    >
      {/* BACKGROUND: black hole fills the whole section */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <BlackHoleScene />
      </div>

      {/* FOREGROUND */}
      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1800px] grid-cols-1 items-center gap-12 px-6 xl:grid-cols-[1fr_minmax(0,760px)_1fr] xl:gap-0 xl:px-12">
        {/* LEFT: typewriter */}
        <div className="min-h-[220px]">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/50">
            I am an
          </p>
          <Typewriter />
        </div>

        {/* CENTER: empty spacer so the black hole shows through */}
        <div className="hidden xl:block" aria-hidden />

        {/* RIGHT: skills carousel */}
        <div className="relative min-w-0 overflow-hidden" style={fadeMask}>
          <motion.div
            className="flex w-max gap-4 will-change-transform"
            animate={MARQUEE_ANIMATE}
            transition={MARQUEE_TRANSITION}
          >
            <SkillsGroup />
            <SkillsGroup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;