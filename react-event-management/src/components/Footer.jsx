import React from "react";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="container d-flex flex-wrap justify-content-between align-items-center">
        <span>© {new Date().getFullYear()} EventPlanner. All rights reserved.</span>
        <span className="text-muted">
          Built for campus fests, tech meets, and cultural events.
        </span>
      </div>
    </footer>
  );
}

export default Footer;


