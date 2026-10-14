import React, { useState, useEffect } from "react";
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
import Loader from "../components/Loader";

// using the 

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 5000));
      try {
        // Replace with your actual API call
        await fetch('https://api.github.com/users/ishaan175pathak/contributions');
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <Starfield />
      {isLoading && <Loader />}

      {/* Website content */}
      <div className="relative z-10">
        <Navbar />

        <main className="pt-[5rem]">
          <AboutMe />

          <div className="cv-auto"><Timeline /></div>
          <div className="cv-auto"><Research /></div>
          <div className="cv0-auto"><Project /></div>
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