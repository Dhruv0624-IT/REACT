import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import { QRCode } from "react-qrcode-logo";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";

function Register() {
  const { id: eventId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const registration = {
      name,
      email,
      phone,
      date: selectedDate.toDateString(),
      eventId: eventId || null,
      status: "Pending",
    };

    // Save to localStorage (for example purposes)
    const registrations =
      JSON.parse(localStorage.getItem("registrations")) || [];
    registrations.push(registration);
    localStorage.setItem("registrations", JSON.stringify(registrations));

    setSubmitted(true);
    toast.success("Registration successful");

    // Optionally reset form
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📋 Event Registration</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone (optional)"
            />
          </div>

          <div className="col-12">
            <label className="form-label">Pick a Registration Date</label>
            <div className="border rounded p-2">
              <Calendar onChange={setSelectedDate} value={selectedDate} />
            </div>
          </div>

          <div className="col-12">
            <button className="btn btn-primary">Submit Registration</button>
          </div>
        </form>
      ) : (
        <div className="mt-4">
          <div className="alert alert-success">
            ✅ Registration successful!
          </div>

          <div className="card p-3 shadow-sm mb-4">
            <h5 className="mb-3">📧 Email Confirmation (Mock)</h5>
            <p>Hi {name},</p>
            <p>
              You've successfully registered for the event on{" "}
              <strong>{selectedDate.toDateString()}</strong>.
            </p>
            <p>
              Please keep the following QR code for entry verification at the
              event.
            </p>
            <p className="text-muted">– Event Management Team</p>
          </div>

          <div className="text-center">
            <QRCode
              value={`Name: ${name}\nEmail: ${email}\nDate: ${selectedDate.toDateString()}`}
              size={200}
            />
            <p className="mt-2 text-muted">
              (This QR can be used at the event entry)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
