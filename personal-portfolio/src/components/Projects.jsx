import { useMemo, useState } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal.js';
import ProjectModal from './ProjectModal.jsx';

const PROJECTS = [
  {
    id: 1,
    title: 'Event Management Platform',
    category: 'Web App',
    tags: ['React', 'Bootstrap'],
    description:
      'A full-featured event management dashboard with calendar integration, registrant views, and admin tools.',
    role: 'Frontend development, UI/UX',
  },
  {
    id: 2,
    title: 'Secure File Sharing System',
    category: 'Web App',
    tags: ['MERN-STACK'],
    description:
      'A secure file sharing system with role based authentication, file upload, and download functionality.',
    role: 'Frontend development, Authentication, UI/UX',
  },
  {
    id: 3,
    title: 'Task Manager',
    category: 'Productivity',
    tags: ['React', 'Local Storage'],
    description:
      'A clean, responsive task manager with filtering, persistence, and a focus on minimal UI.',
    role: 'Design & implementation',
  },
  {
    id: 4,
    title: 'Blog Platform (Redux Toolkit)',
    category: 'Web App',
    tags: ['React', 'Redux Toolkit'],
    description:
      'Blog management UI with CRUD operations, routed detail pages, and global state with Redux Toolkit.',
    role: 'State management and routing',
  },
  {
    id: 5,
    title: 'Personal Portfolio',
    category: 'Productivity',
    tags: ['React', 'Bootstrap'],
    description:
      'A personal portfolio website to showcase my projects and skills.',
    role: 'Development and deployment',
  },
  {
    id: 6,
    title: 'Smart Parking System',
    category: 'Web App',
    tags: ['MERN-STACK'],
    description:
      'A smart parking system with real-time space availability, booking, and payment integration.',
    role: 'Development and deployment ',
  },
];

const Projects = () => {
  const { ref, isInView } = useScrollReveal();
  const [filter, setFilter] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  const categories = useMemo(
    () => ['All', ...new Set(PROJECTS.map((p) => p.category))],
    [],
  );

  const filteredProjects =
    filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding">
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8 text-center">
            <h2 className="section-title">Projects</h2>
            <p className="text-muted">
              A selection of projects that highlight my experience with React, state management,
              and polished UI design.
            </p>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm rounded-pill ${
                filter === cat ? 'btn-primary' : 'btn-outline-light'
              }`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          ref={ref}
          className="row g-4"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {filteredProjects.map((project) => (
            <div key={project.id} className="col-md-6 col-lg-4">
              <motion.div
                className="project-card glass-card h-100"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                <div className="project-thumbnail mb-3" />
                <h5 className="fw-semibold mb-1">{project.title}</h5>
                <p className="text-muted small mb-2">{project.description}</p>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="badge rounded-pill bg-primary-subtle text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm rounded-pill"
                  onClick={() => setActiveProject(project)}
                >
                  View Details
                </button>
              </motion.div>
            </div>
          ))}
        </motion.div>

        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      </div>
    </section>
  );
};

export default Projects;


