import React from "react";
import Navbar from "../components/Navbar";
import Starfield from "../components/Starfield";
import AboutMe from "../components/AboutMe";
import Timeline from "../components/Timeline";
import Project from "../components/Projects";
import Research from "../components/Research";
import GithubContributions from "../components/GithubContributions";
import Resume from "../components/Resume";
import Contact from "../components/ContactMe";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <Starfield />

      {/* Website content */}
      <div className="relative z-10">
        <Navbar />

        <main className="pt-[5rem]">
          <AboutMe />

          <div className="cv-auto"><Timeline /></div>
          <div className="cv-auto"><Research /></div>
          <div className="cv-auto"><Project /></div>
          <div className="cv-auto"><GithubContributions /></div>
          <div className="cv-auto"><Resume /></div>
          <div className="cv-auto"><Contact /></div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;