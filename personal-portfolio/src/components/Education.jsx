import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

const education = [
    {
        period: '2020 - 2023',
        title: 'Higher Secondary Education',
        institute: 'Nirman High School',
        details:
          'Completed higher secondary with a strong foundation in mathematics, computer science, and problem solving.',
      },
  {
    period: '2023 - 2026',
    title: 'Bachelor of Science in Information Technology (BSc IT)',
    institute: 'JG University ',
    details:
      'Focused on web development, data structures, database management, and modern JavaScript frameworks.',
  },
  {
    period: '2024 - 2026',
    title: 'Full Stack Development',
    institute: 'Red and White Multimedia Institute',
    details:
      'Gained knowledge of full stack development and web development.',
  },
];

const Education = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="education" className="section-padding bg-subtle">
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8 text-center">
            <h2 className="section-title">Education</h2>
            <p className="text-muted">
              My academic journey that laid the foundation for my work as a MERN-stack developer.
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
          {education.map((item) => (
            <div key={item.period} className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-content glass-card">
                <p className="timeline-period small text-muted mb-1">{item.period}</p>
                <h5 className="mb-0">{item.title}</h5>
                <p className="fw-semibold small text-gradient mb-2">{item.institute}</p>
                <p className="text-muted small mb-0">{item.details}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;


