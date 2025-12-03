/* eslint-disable-next-line no-unused-vars */
import { motion } from 'framer-motion';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div
      className="modal-backdrop-custom"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdropVariants}
      onClick={onClose}
    >
      <motion.div
        className="modal-dialog-custom glass-card"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header border-0">
          <h5 className="modal-title fw-semibold">{project.title}</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
        </div>
        <div className="modal-body">
          <p className="text-muted">{project.description}</p>
          {project.features && (
            <ul className="small text-muted">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
          <div className="d-flex flex-wrap gap-2 mt-3">
            {project.tags.map((tag) => (
              <span key={tag} className="badge rounded-pill bg-primary-subtle text-primary">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="modal-footer border-0 d-flex justify-content-between">
          <div className="small text-muted">{project.role}</div>
          <div className="d-flex gap-2">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-sm"
              >
                Live Demo
              </a>
            )}
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-light btn-sm"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;


