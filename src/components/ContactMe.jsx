import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen w-full flex flex-col items-center justify-center
                 px-6 py-24 text-white"
    >
      {/* Heading */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Let's Connect
        </h1>

        <p className="text-gray-400 text-lg">
          Interested in working together or have an opportunity to discuss?
          Feel free to reach out.
        </p>
      </div>

      {/* Contact Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">

        {/* Email */}
        <a
          href="mailto:ishaan175pathak@gmail.com"
          target="_blank"
          className="px-7 py-3 rounded-lg
                     bg-white text-black font-semibold
                     hover:bg-gray-200
                     transition-all duration-300"
        >
          Email Me
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3 rounded-lg
                     border border-white/20
                     text-white
                     hover:bg-white/10
                     transition-all duration-300"
        >
          LinkedIn
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/ishaan175pathak"
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3 rounded-lg
                     border border-white/20
                     text-white
                     hover:bg-white/10
                     transition-all duration-300"
        >
          GitHub
        </a>

      </div>

      {/* Email displayed explicitly */}
      <p className="mt-8 text-gray-500 text-sm">
        ishaan175pathak@gmail.com
      </p>

    </section>
  );
};

export default Contact;