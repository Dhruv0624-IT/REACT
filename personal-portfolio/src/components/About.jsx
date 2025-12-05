import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

const About = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="about" className="section-padding">
      <div className="container">
        <motion.div
          ref={ref}
          className="row align-items-center g-4"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="col-lg-7">
            <h2 className="section-title">About Me</h2>
            <p className="text-muted">
              I&apos;m a MERN-stack developer who enjoys turning ideas into clean, responsive web
              experiences. I focus on writing readable code, structuring projects well, and
              keeping the UI fast and intuitive.
            </p>
            <p className="text-muted">
              Right now I&apos;m sharpening my full stack skills with real projects using React,
              Node.js, Express, and MongoDB. I like building dashboards, admin panels, and
              portfolio-style apps where I can combine good UX with solid frontend engineering.
            </p>
            <div className="row g-3 mt-1">
              <div className="col-sm-6">
                <div className="stat-card glass-card h-100">
                  <p className="mb-1 fw-semibold small text-uppercase text-muted">
                    What I&apos;m looking for
                  </p>
                  <p className="mb-0 small text-muted">
                    Internships or entry-level roles where I can grow as a full stack / frontend
                    developer and work with modern JavaScript stacks.
                  </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="stat-card glass-card h-100">
                  <p className="mb-1 fw-semibold small text-uppercase text-muted">
                    Current focus
                  </p>
                  <p className="mb-0 small text-muted">
                    Building real-world MERN projects, improving API integration, authentication,
                    and reusable UI components.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="row g-3">
              <div className="col-6">
                <div className="stat-card glass-card text-center">
                  <h3 className="display-6 fw-bold mb-0">5+</h3>
                  <p className="text-muted mb-0 small">Projects completed</p>
                </div>
              </div>
              <div className="col-6">
                <div className="stat-card glass-card text-center">
                  <h3 className="display-6 fw-bold mb-0">2024</h3>
                  <p className="text-muted mb-0 small">Started web dev journey</p>
                </div>
              </div>
              <div className="col-12">
                <div className="stat-card glass-card">
                  <p className="mb-1 fw-semibold">Core Focus</p>
                  <p className="text-muted small mb-2">
                    Single Page Applications, component-driven design, responsive layouts, and
                    smooth animations that feel natural—not distracting.
                  </p>
                  <p className="text-muted small mb-0">
                    Tech I enjoy working with: <strong>React</strong>, <strong>Node.js</strong>,
                    {' '}
                    <strong>Express</strong>, <strong>MongoDB</strong>, <strong>Bootstrap</strong>,
                    {' '}
                    and <strong>Framer Motion</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;


