import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: "Research Assistant",
    company: "Lawrence Technological University",
    period: "February 2025 - July 2026",
    desc: "Reached 81% mAP on YOLO-based crack detection by curating and annotating a 10,000+ image dataset. Built computer vision models for medical detection and helped refine and publish research manuscripts."
  },
  {
    role: "Student Web Developer",
    company: "Lawrence Technological University",
    period: "May 2025 - August 2025",
    desc: "Built a web app for anonymous essay submissions used by 50+ students. Integrated a Gen AI model to benchmark automated grading against human assessments, improving consistency by 25% and cutting manual evaluation time by 40%."
  },
  {
    role: "Machine Learning Engineer",
    company: "GenieTalk.ai",
    period: "June 2022 - February 2023",
    desc: "Developed text classification models with TensorFlow and scikit-learn, deployed them on AWS, and built APIs for model integration that improved response times by 20%."
  },
  {
    role: "Student Transit Service",
    company: "DesignStudio",
    period: "August 2025 - December 2025",
    desc: "Translated Figma prototypes into pixel-perfect responsive code. Collaborated closely with UX designers."
  },
  {
    role: "Junior Data Scientist",
    company: "DesignStudio",
    period: "July 2023 - July 2024",
    desc: "Translated Figma prototypes into pixel-perfect responsive code. Collaborated closely with UX designers."
  }
];

export default function Timeline() {
  return (
    <section className="py-20 bg-transparent text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 w-full">

        <h2 className="text-4xl font-bold text-center mb-16">
          My Experience
        </h2>

        {/* Timeline */}
        <div className="relative">

          {/* Center Timeline Line */}
          <motion.div
            className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full
                       bg-gradient-to-b from-blue-500 to-purple-500 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ margin: "-100px" }}
            transition={{
              duration: 1.2,
              ease: "easeInOut",
            }}
          />

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className="relative grid grid-cols-2 mb-16"
                initial={{
                  opacity: 0,
                  x: isLeft ? -30 : 30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
              >

                {/* LEFT SIDE */}
                <div
                  className={`${
                    isLeft
                      ? "pr-12 text-right"
                      : ""
                  }`}
                >
                  {isLeft && (
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50
                                    hover:border-blue-500/50 transition-colors">
                      
                      <h3 className="text-xl font-bold text-slate-100">
                        {exp.role}
                      </h3>
                      
                      <h4 className="text-md font-medium text-blue-400 mb-3">
                        {exp.company}
                      </h4>

                      <p className="text-xs text-slate-400 mb-2">{exp.period}</p>

                      <p className="text-slate-300 text-sm leading-relaxed">
                        {exp.desc}
                      </p>

                    </div>
                  )}
                </div>


                {/* RIGHT SIDE */}
                <div
                  className={`${
                    !isLeft
                      ? "pl-12 text-left"
                      : ""
                  }`}
                >
                  {!isLeft && (
                    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50
                                    hover:border-blue-500/50 transition-colors backdrop-blur-sm">

                      <h3 className="text-xl font-bold text-slate-100">
                        {exp.role}
                      </h3>
                      
                      <h4 className="text-md font-medium text-blue-400 mb-3">
                        {exp.company}
                      </h4>

                      <p className="text-xs text-slate-400 mb-2">{exp.period}</p>

                      <p className="text-slate-300 text-sm leading-relaxed">
                        {exp.desc}
                      </p>

                    </div>
                  )}
                </div>


                {/* TIMELINE DOT */}
                <motion.div
                  className="absolute left-1/2 top-6 -translate-x-1/2
                             w-4 h-4 rounded-full bg-slate-900
                             border-2 border-blue-500 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.2 + 0.3,
                    type: "spring",
                    stiffness: 300,
                  }}
                />

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}