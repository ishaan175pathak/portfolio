import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GITHUB = "https://github.com/ishaan175pathak";
const RESEARCHGATE = "https://www.researchgate.net/profile/Ishaan-Pathak-3/research";

const researchAreas = [
  {
    id: 1,
    title: "Structural Health Monitoring",
    short: "SHM",
    position: "top",
    summary:
      "Computer vision for automated detection of cracks and structural defects, making infrastructure inspection faster and more consistent than manual surveys.",
    highlights: [
      "Curated and annotated a 10,000+ image crack dataset",
      "YOLO-based detection models reaching 81% mAP",
      "Part of the Smart Infrastructure Damage Detection project at Lawrence Technological University",
    ],
    tags: ["YOLO", "Computer Vision", "Object Detection"],
    papers: [],
  },
  {
    id: 2,
    title: "Generative AI Evaluations Strategies",
    short: "GEN AI",
    position: "right",
    summary:
      "How to measure and trust generative models: benchmarking automated grading against human judgment, learning from human feedback, and generating content from non-text signals.",
    highlights: [
      "Benchmarked Gen AI essay grading against human assessments, improving consistency by 25%",
      "Studied feedback-driven training for summarization (RLHF)",
      "Explored music generation from sequential motion signals",
    ],
    tags: ["LLM Evaluation", "RLHF", "Human Feedback", "Multimodal"],
    papers: [
      {
        title: "AI-Powered Music Generation from Sequential Motion Signals",
        venue: "IJIIS, 2025",
        status: "Published",
        link: RESEARCHGATE,
      },
      {
        title: "Learning to Summarize from Human Feedback",
        venue: "Course research paper",
        status: "Course paper",
        link: `${GITHUB}/learning-to-summarize-from-human-feedback-`,
      },
    ],
  },
  {
    id: 3,
    title: "Medical AI",
    short: "MED",
    position: "bottom",
    summary:
      "Deep learning for medical imaging, focused on fast and accurate detection of disease in scans to support automated medical research.",
    highlights: [
      "YOLOv11 for real-time brain tumor detection in MRI scans",
      "Computer vision models for medical detection tasks",
      "Work on Alzheimer's and brain tumor detection",
    ],
    tags: ["YOLOv11", "MRI", "Deep Learning", "PyTorch"],
    papers: [
      {
        title: "Advancing Automated Brain Tumor Detection via YOLOv11",
        venue: "JCTR, 2025",
        status: "Published",
        link: RESEARCHGATE,
      },
    ],
  },
  {
    id: 4,
    title: "Information Retrieval",
    short: "IR",
    position: "left",
    summary:
      "Improving search relevance with neural reranking that learns from user behavior, evaluated on standard TREC and MS MARCO benchmarks.",
    highlights: [
      "Fine-tuned Sentence-BERT on MS MARCO with binary cross-entropy",
      "Integrated clickstream data for behavior-aware reranking",
      "MRR@10 of 0.0406 with 15% faster inference",
    ],
    tags: ["BERT", "Cross-Encoders", "TREC DL", "Reranking"],
    papers: [
      {
        title: "Personalized Search Reranker",
        venue: "Course research paper",
        status: "Course paper",
        link: GITHUB, // TODO: replace with the repo link
      },
    ],
  },
];

export default function Research() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState(null);

  const handleSunClick = () => {
    setIsExpanded((prev) => !prev);

    // Reset selected research when collapsing
    if (isExpanded) {
      setSelectedResearch(null);
    }
  };

  return (
    <section className="relative py-24 bg-transparent text-white overflow-hidden">

      <div className="max-w-6xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-blue-400 mb-3">
            Research
          </p>

          <h2 className="text-4xl md:text-5xl font-bold">
            Exploring Ideas Beyond Projects
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-slate-400 leading-relaxed">
            Areas of research spanning computer vision, multimodal AI,
            medical imaging, and information retrieval.
          </p>

          <a
            href={RESEARCHGATE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 rounded-full border border-blue-500/40 px-5 py-2 text-sm text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 transition-colors"
          >
            View all publications on ResearchGate ↗
          </a>
        </motion.div>


        {/* ================= SOLAR SYSTEM ================= */}
        <motion.div
          animate={{
            height: isExpanded ? 620 : 600,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto max-w-5xl overflow-hidden"
        >

          {/* ================= ORBIT RINGS ================= */}

          <motion.div
            className="absolute left-1/2 top-1/2
                       -translate-x-1/2 -translate-y-1/2
                       w-[280px] h-[280px]
                       md:w-[360px] md:h-[360px]
                       rounded-full border border-blue-500/10"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.div
            className="absolute left-1/2 top-1/2
                       -translate-x-1/2 -translate-y-1/2
                       w-[390px] h-[390px]
                       md:w-[480px] md:h-[480px]
                       rounded-full border border-purple-500/10"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 90,
              repeat: Infinity,
              ease: "linear",
            }}
          />


          {/* ================= ORBIT ================= */}

          <motion.div
            className="absolute left-1/2 top-1/2
                       -translate-x-1/2 -translate-y-1/2
                       w-[360px] h-[360px]
                       md:w-[480px] md:h-[480px]"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
          >

            {/* ===== PLANET 1 ===== */}
            <ResearchPlanet
              area={researchAreas[0]}
              className="absolute left-1/2 -top-6 -translate-x-1/2"
              selected={selectedResearch === researchAreas[0].id}
              onClick={() =>
                setSelectedResearch(researchAreas[0].id)
              }
              counterRotate
            />

            {/* ===== PLANET 2 ===== */}
            <ResearchPlanet
              area={researchAreas[1]}
              className="absolute -right-6 top-1/2 -translate-y-1/2"
              selected={selectedResearch === researchAreas[1].id}
              onClick={() =>
                setSelectedResearch(researchAreas[1].id)
              }
              counterRotate
            />

            {/* ===== PLANET 3 ===== */}
            <ResearchPlanet
              area={researchAreas[2]}
              className="absolute left-1/2 -bottom-6 -translate-x-1/2"
              selected={selectedResearch === researchAreas[2].id}
              onClick={() =>
                setSelectedResearch(researchAreas[2].id)
              }
              counterRotate
            />

            {/* ===== PLANET 4 ===== */}
            <ResearchPlanet
              area={researchAreas[3]}
              className="absolute -left-6 top-1/2 -translate-y-1/2"
              selected={selectedResearch === researchAreas[3].id}
              onClick={() =>
                setSelectedResearch(researchAreas[3].id)
              }
              counterRotate
            />

          </motion.div>


          {/* ================= SUN ================= */}

          <motion.button
            onClick={handleSunClick}
            className="absolute left-1/2 top-1/2
                       -translate-x-1/2 -translate-y-1/2
                       w-32 h-32 md:w-40 md:h-40
                       rounded-full
                       bg-gradient-to-br
                       from-yellow-400
                       via-blue-600
                       to-purple-700
                       border border-blue-300/40
                       shadow-[0_0_60px_rgba(59,130,246,0.35)]
                       flex flex-col items-center justify-center
                       z-20 cursor-pointer"
            whileHover={{
              scale: 1.08,
              boxShadow:
                "0 0 90px rgba(59,130,246,0.55)",
            }}
            whileTap={{
              scale: 0.95,
            }}
          >

            {/* Sun glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-400/20"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <span className="relative text-lg md:text-xl font-bold">
              Research
            </span>

            <span className="relative text-xs text-blue-100 mt-1">
              {isExpanded ? "Collapse" : "Explore"}
            </span>

          </motion.button>


          {/* ================= EXPANDED INDICATOR ================= */}

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="absolute bottom-5 left-1/2
                           -translate-x-1/2
                           text-xs text-slate-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                Select a research area to explore
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>


        {/* ================= RESEARCH CARDS ================= */}

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                height: 0,
              }}
              animate={{
                opacity: 1,
                y: 0,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                y: 30,
                height: 0,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden"
            >

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-start">

                {researchAreas.map((area, index) => {

                  const isSelected =
                    selectedResearch === area.id;

                  return (
                    <motion.div
                      key={area.id}
                      onClick={() =>
                        setSelectedResearch(area.id)
                      }
                      className={`
                        min-h-[220px]
                        rounded-2xl
                        border
                        p-6
                        cursor-pointer
                        backdrop-blur-sm
                        transition-all
                        duration-300

                        ${
                          isSelected
                            ? "border-blue-400/70 bg-blue-500/10"
                            : "border-slate-700/50 bg-slate-800/30 hover:border-blue-500/40"
                        }
                      `}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.1,
                      }}
                      whileHover={{
                        y: -5,
                      }}
                    >

                      {/* Card header */}
                      <div className="flex items-center justify-between">

                        <div>
                          <p className="text-xs uppercase tracking-widest text-blue-400">
                            Research Area
                          </p>

                          <h3 className="text-xl font-semibold mt-2">
                            {area.title}
                          </h3>
                        </div>

                        <div
                          className="
                            w-10 h-10 shrink-0
                            rounded-full
                            border border-blue-500/30
                            flex items-center justify-center
                            text-xs
                            text-blue-400
                          "
                        >
                          {area.short}
                        </div>

                      </div>

                      {/* Summary */}
                      <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                        {area.summary}
                      </p>

                      {/* Key work (revealed when the card or planet is selected) */}
                      <AnimatePresence initial={false}>
                        {isSelected && (
                          <motion.ul
                            key="highlights"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35 }}
                            className="mt-4 space-y-1 text-sm text-slate-400 list-disc list-inside overflow-hidden"
                          >
                            {area.highlights.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {area.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-blue-800/60 text-white text-xs px-2 py-1 rounded-2xl"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Papers */}
                      <div className="mt-5 border-t border-slate-700/50 pt-4">
                        {area.papers.length > 0 ? (
                          <ul className="space-y-3">
                            {area.papers.map((paper) => (
                              <li key={paper.title} className="flex items-start justify-between gap-3">
                                <div>
                                  <p className="text-sm font-medium text-slate-100">
                                    {paper.title}
                                  </p>
                                  <p className="text-xs text-slate-500 mt-0.5">
                                    {paper.venue}
                                  </p>
                                </div>

                                <a
                                  href={paper.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className={`shrink-0 rounded-full border px-3 py-1 text-xs transition-colors ${
                                    paper.status === "Published"
                                      ? "border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"
                                      : "border-slate-600 text-slate-300 hover:bg-slate-700/40"
                                  }`}
                                >
                                  {paper.status === "Published" ? "Published ↗" : "View on GitHub ↗"}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-xs text-slate-500">
                            Ongoing research, publication in progress
                          </span>
                        )}
                      </div>

                    </motion.div>
                  );
                })}

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}


/* =========================================================
   RESEARCH PLANET
========================================================= */

function ResearchPlanet({
  area,
  className,
  selected,
  onClick,
  counterRotate,
}) {

  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`
        ${className}
        w-20 h-20 md:w-24 md:h-24
        rounded-full
        flex flex-col items-center justify-center
        border
        backdrop-blur-md
        z-10
        cursor-pointer
        transition-all duration-300

        ${
          selected
            ? "bg-blue-500/20 border-blue-400 shadow-[0_0_35px_rgba(59,130,246,0.35)]"
            : "bg-slate-900/80 border-slate-700/70 hover:border-blue-400/60"
        }
      `}
      animate={
        counterRotate
          ? {
              rotate: -360,
            }
          : undefined
      }
      transition={{
        duration: 35,
        repeat: Infinity,
        ease: "linear",
      }}
      whileHover={{
        scale: 1.15,
      }}
      whileTap={{
        scale: 0.9,
      }}
    >

      <span className="text-xs md:text-sm font-semibold text-slate-100">
        {area.short}
      </span>

      <span className="text-[9px] md:text-[10px] text-slate-500 mt-1">
        Explore
      </span>

    </motion.button>
  );
}