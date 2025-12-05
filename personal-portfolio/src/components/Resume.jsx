import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import { useScrollReveal } from '../hooks/useScrollReveal.js';

const Resume = () => {
  const ref = useScrollReveal();

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Dhruv_Desai_Resume..pdf';
    link.download = 'Dhruv_Desai_Resume.pdf';
    link.click();
  };

  return (
    <section id="resume" className="resume-section py-5 position-relative overflow-hidden">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-5"
        >
          <h2 className="display-5 fw-bold mb-4">
            <span className="highlight-text">Resume</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="resume-container"
        >
          <div className="row">
            <div className="col-12 d-flex flex-column align-items-center">
              <motion.div
                className="resume-image-box rounded-4 overflow-hidden glass-effect"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img
                  src="/image.png"
                  alt="Resume Preview"
                  className="w-100 h-100"
                />
              </motion.div>
              
              <motion.button
                className="btn btn-primary btn-sm px-3 py-2 d-inline-flex align-items-center gap-2 mt-4"
                onClick={downloadResume}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
              >
                <FaDownload /> Download Resume
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
