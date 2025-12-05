import './App.css';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Education from './components/Education.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import ExperienceTimeline from './components/ExperienceTimeline.jsx';
import Resume from './components/Resume.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <ExperienceTimeline />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

