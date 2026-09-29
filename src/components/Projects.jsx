import React, { useState } from 'react';

const GITHUB = "https://github.com/ishaan175pathak";

const ProjectsList = [
  {
    title: "Brain Tumor Detection with YOLOv11",
    desc: `A real-time deep learning system that detects brain tumors in MRI scans
          using YOLOv11. Built as part of my computer vision research at Lawrence
          Technological University and published in the Journal of Cancer Treatment
          and Research (2025).`,
    highlights: [
      "Peer-reviewed publication (JCTR, 2025)",
      "Real-time MRI analysis pipeline",
      "Trained and evaluated with PyTorch",
    ],
    tags: ["Python", "PyTorch", "YOLOv11", "Computer Vision"],
    links: `${GITHUB}/Brain-Tumor-Detection`
  },
  {
    title: "Personalized Search Reranker",
    desc: `A behavior-aware reranking pipeline that uses user clickstream data to
          improve search relevance. Sentence-BERT is fine-tuned on MS MARCO with
          binary cross-entropy to predict query-document relevance.`,
    highlights: [
      "MRR@10 of 0.0406 on TREC DL",
      "15% faster inference via optimized preprocessing",
      "Cross-encoder and AdamW training setup",
    ],
    tags: ["Python", "PyTorch", "BERT", "Cross-Encoders"],
    links: GITHUB // TODO: replace with the repo link
  },
  {
    title: "MedBot360 – AI Health Companion",
    desc: `A MERN-based health dashboard for secure symptom tracking and personalized
          recommendations. A Hugging Face-powered medical chatbot analyzes symptoms in
          real time, and the full stack is containerized and deployed on AWS.`,
    highlights: [
      "Serves 200+ users",
      "Chatbot accuracy improved by 30%",
      "Dockerized for high availability",
    ],
    tags: ["MERN", "Hugging Face", "Docker", "AWS"],
    links: GITHUB // TODO: replace with the repo link
  },
  {
    title: "FinWise – AI Financial Advisor",
    desc: `A GPT-powered financial agent that analyzes Plaid data to give personalized
          insights. Users can ask questions in natural language, answered through
          LangChain retrieval, and explore results on a React + Chart.js dashboard.`,
    highlights: [
      "Redis caching for low-latency analytics",
      "Natural language financial queries",
      "Improved decision-making by 40%",
    ],
    tags: ["React", "LangChain", "Redis", "AWS"],
    links: GITHUB // TODO: replace with the repo link
  },
  {
    title: "Anonymous Essay Grading Platform",
    desc: `A web app for anonymous essay submission and grading, so evaluations stay
          free of bias. A Gen AI model grades essays alongside human reviewers so the
          two can be benchmarked against each other.`,
    highlights: [
      "Used by 50+ students",
      "25% better grading consistency",
      "40% less manual evaluation time",
    ],
    tags: ["Spring Boot", "Kafka", "Docker", "AWS"],
    links: GITHUB // TODO: replace with the repo link
  },
  {
    title: "Learning to Summarize from Human Feedback",
    desc: `A notebook-based exploration of training summarization models with human
          preference feedback (RLHF). It walks through the reward modeling and policy
          fine-tuning ideas behind feedback-driven language models.`,
    highlights: [
      "Reward modeling from human preferences",
      "Policy fine-tuning experiments",
      "Documented in Jupyter notebooks",
    ],
    tags: ["Python", "PyTorch", "NLP", "RLHF"],
    links: `${GITHUB}/learning-to-summarize-from-human-feedback-`
  }
]

function FlipCard({ title, tags, desc, highlights, links }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="h-[60vh] w-[25vw] [perspective:1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Inner Card Wrapper */}
      <div className={`relative h-full w-full rounded-2xl shadow-xl transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>

        {/* FRONT SIDE */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 p-6 text-white [backface-visibility:hidden] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold">{title}</h3>
          </div>
          <span className="text-xs font-semibold uppercase opacity-70 p-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-blue-800 h-fit text-white text-xs px-2 py-1 rounded-2xl mr-1">{tag}</span>
            ))}
          </span>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-slate-900 p-6 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col">

          {/* Content area: takes remaining space and scrolls if it gets too long */}
          <div className="flex-1 min-h-0 overflow-y-auto text-left pr-1">
            <h4 className="text-lg font-bold text-purple-300">{title}</h4>
            <p className="mt-2 text-sm text-slate-300">{desc}</p>

            {highlights && (
              <ul className="mt-4 space-y-1 text-sm text-slate-300 list-disc list-inside">
                {highlights.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Button stays pinned to the bottom regardless of content length */}
          <a
            href={links}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // Stops the click from triggering the card flip
            className="mt-4 shrink-0 rounded-lg bg-purple-500 px-4 py-2 text-center text-sm font-semibold hover:bg-purple-600 transition-colors"
          >
            View on GitHub
          </a>
        </div>

      </div>
    </div>
  );
}

export default function CardGrid() {
  // State to track if all cards are shown
  const [isExpanded, setIsExpanded] = useState(false);

  // If expanded, show all. If not, only slice the first 3.
  const visibleCards = isExpanded ? ProjectsList : ProjectsList.slice(0, 3);

  return (
    <div className="container mt-10 mb-10 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center justify-items-center gap-5 w-full mb-5">
        {visibleCards.map((card, index) => (
          <FlipCard
            key={index}
            title={card.title}
            tags={card.tags}
            desc={card.desc}
            highlights={card.highlights}
            links={card.links}
          />
        ))}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="rounded-xl bg-indigo-600 mt-10 px-6 py-3 font-semibold text-white shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105"
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}