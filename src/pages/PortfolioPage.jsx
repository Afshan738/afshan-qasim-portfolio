import React from "react";
import Header from "../public-components/Header";
import Hero from "../public-components/Hero";
import About from "../public-components/About";
import Skills from "../public-components/Skills";
import Projects from "../public-components/Projects";
import Contact from "../public-components/Contact"; 
import Footer from  "../public-components/footer"; 
import Education from "../public-components/Education";
import Tagline from "../public-components/Tagline";
import Certificates from "../public-components/Certificate";
import Services from "../public-components/Service";
function PortfolioPage() {
  
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Education/>
      <Tagline/>
      <Skills />
      <Projects />
      <Certificates/>
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
export default PortfolioPage;