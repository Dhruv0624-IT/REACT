import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section id="home" className="hero-section position-relative overflow-hidden" ref={ref}>
      <div className="hero-overlay" />
      <motion.div
        className="hero-particles"
        style={{ y: yParallax }}
        aria-hidden="true"
      />
      <div className="container position-relative">
        <div className="row align-items-center min-vh-100">
          <div className="col-lg-7">
            <motion.p
              className="text-uppercase text-gradient fw-semibold mb-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              MERN Stack Developer • Full Stack Learner
            </motion.p>
            <motion.h1
              className="hero-title display-4 fw-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              Hi, I&apos;m <span className="text-gradient">Dhruv Desai</span>
              <span className="d-block">I build modern web experiences</span>
            </motion.h1>
            <motion.p
              className="lead text-muted mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Aspiring full stack developer focused on the MERN stack. I enjoy building clean,
              responsive interfaces and connecting them to real APIs with Node.js, Express, and
              MongoDB. Always learning, always experimenting with new ideas.
            </motion.p>
            <motion.div
              className="d-flex flex-wrap gap-3 mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <a href="#projects" className="btn btn-primary btn-lg px-4 rounded-pill shadow-soft">
                View Projects
              </a>
              <a href="#contact" className="btn btn-outline-light btn-lg px-4 rounded-pill">
                Let&apos;s Talk
              </a>
              {/* Replace href with your actual resume link if available */}
              {/* <a
                href="/Dhruv_Desai_Resume.pdf"
                className="btn btn-outline-light btn-lg px-4 rounded-pill d-none d-md-inline-flex"
              >
                Download CV
              </a> */}
            </motion.div>
            <motion.div
              className="d-flex flex-wrap gap-2 small text-muted"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              {/* <span className="badge rounded-pill bg-primary-subtle text-primary">
                MERN Stack
              </span>
              <span className="badge rounded-pill bg-primary-subtle text-primary">
                React &amp; Bootstrap
              </span>
              <span className="badge rounded-pill bg-primary-subtle text-primary">
                Framer Motion
              </span> */}
            </motion.div>
          </div>
          <div className="col-lg-5 mt-5 mt-lg-0">
            <motion.div
              className="hero-card glass-card mx-auto"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div className="hero-avatar mb-3">
                <img src="/My Pic .png" alt="Dhruv Desai" className="avatar-img" />
              </div>
              <h3 className="mb-1">Dhruv Desai</h3>
              <p className="text-muted mb-3">MERN Stack Developer</p>
              <div className="d-flex justify-content-center gap-2 flex-wrap small text-muted">
                <span className="badge rounded-pill bg-primary-subtle text-primary">
                  Full Stack Practice
                </span>
                <span className="badge rounded-pill bg-primary-subtle text-primary">
                  Open to internships
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


