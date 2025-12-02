const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer py-4 border-top border-opacity-10">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <span className="small text-muted">
          © {2025} Dhruv Desai. all rights reserved.
        </span>
        <span className="small text-muted">
          Open to frontend roles, internships, and freelance projects.
        </span>
      </div>
    </footer>
  );
};

export default Footer;


