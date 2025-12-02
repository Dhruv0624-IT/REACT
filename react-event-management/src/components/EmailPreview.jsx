import React from "react";
import { Modal, Button } from "react-bootstrap";

function EmailPreview({ show, onClose, event }) {
  if (!event) return null;

  const { title = "", date = "", location = "" } = event;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Email Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Subject:</strong> New Event Created - {title}</p>
        <p><strong>Body:</strong></p>
        <p>
          Hello,<br />
          You've successfully created an event titled <b>{title}</b> scheduled for <b>{date}</b> at <b>{location}</b>.<br />
          Regards,<br />Event Team
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EmailPreview;
