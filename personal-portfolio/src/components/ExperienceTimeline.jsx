import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

const experience = [
  {
    period: '2024 - Present',
    title: 'Frontend Developer (Freelance)',
    company: 'Self-employed',
    details:
      'Building React-based dashboards, landing pages, and small applications with a focus on performance and usability.',
  },
  {
    period: '2023 - 2024',
    title: 'React Projects',
    company: 'Personal & Academic',
    details:
      'Developed multiple React apps (file sharing, event management, hotel dashboard, CRUD admin, blog app) using Redux and Context.',
  },
  {
    period: '2022 - 2023',
    title: 'Learning & Foundations',
    company: 'Web Development',
    details:
      'Strengthened fundamentals in JavaScript, HTML, CSS, responsive design, and UI frameworks like Bootstrap.',
  },
];

const ExperienceTimeline = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="experience" className="section-padding bg-subtle">
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8 text-center">
            <h2 className="section-title">Experience</h2>
            <p className="text-muted">
              A quick timeline of how I&apos;ve grown my skills and experience as a frontend
              developer.
            </p>
          </div>
        </div>

        <motion.div
          ref={ref}
          className="timeline"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {experience.map((item, index) => (
            <div key={item.period} className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content glass-card">
                <p className="timeline-period small text-muted mb-1">{item.period}</p>
                <h5 className="mb-0">{item.title}</h5>
                <p className="fw-semibold small text-gradient mb-2">{item.company}</p>
                <p className="text-muted small mb-0">{item.details}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;


