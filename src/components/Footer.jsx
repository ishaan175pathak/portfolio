import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 px-6 py-8 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Ishaan Pathak
        </p>

        <p className="text-sm text-gray-500">
          Built with React & Tailwind CSS
        </p>

      </div>
    </footer>
  );
};

export default Footer;