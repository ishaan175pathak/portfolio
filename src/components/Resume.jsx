import React from "react";

const Resume = () => {
  return (
    <section className="resume-section text-white font-bold" id="resume">
      
      <h1 className="resume-title text-5xl font-bold"> Resume</h1>

      <div className="resume-container">

        <div className="resume-actions">
          <a
            href="/Resume_Pathak_Ishaan.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>

          <a
            href="/Resume_Pathak_Ishaan.pdf"
            download="Resume_Pathak_Ishaan.pdf"
          >
            Download PDF
          </a>
        </div>

        <iframe
          src="/Resume_Pathak_Ishaan.pdf"
          title="Ishaan Pathak Resume"
          className="resume-pdf"
          loading="lazy"
        />

      </div>

    </section>
  );
};

export default Resume;