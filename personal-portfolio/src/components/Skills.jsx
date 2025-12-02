import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

const skills = [
  { name: 'React / SPA Architecture', level: 80 },
  { name: 'JavaScript / ESNext', level: 75 },
  { name: 'HTML5 / CSS3 / Bootstrap', level: 95 },
  { name: 'MERN-STACK', level: 70 },
];

const Skills = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="skills" className="section-padding bg-subtle">
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8 text-center">
            <h2 className="section-title">Skills</h2>
            <p className="text-muted">
              A snapshot of the technologies and tools I use to build interactive, production-ready
              web applications.
            </p>
          </div>
        </div>
        <motion.div
          ref={ref}
          className="row g-4"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {skills.map((skill) => (
            <div key={skill.name} className="col-md-6">
              <div className="skill-card glass-card">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold">{skill.name}</span>
                  <span className="text-muted small">{skill.level}%</span>
                </div>
                <div className="progress rounded-pill">
                  <motion.div
                    className="progress-bar"
                    role="progressbar"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    aria-valuenow={skill.level}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;


