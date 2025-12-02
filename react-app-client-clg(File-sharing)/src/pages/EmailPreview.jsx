import React from "react";

const EmailPreview = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📩 Simulated Email Preview</h2>
        <p className="text-gray-600 mb-6">
          This is a mock email to demonstrate what a user might receive after registering or uploading a file.
        </p>

        <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
          <p className="mb-2"><strong>To:</strong> user@example.com</p>
          <p className="mb-2"><strong>Subject:</strong> Registration Confirmation</p>
          <div className="mt-4 text-sm text-gray-700 leading-relaxed">
            <p>Dear User,</p>
            <p className="mt-2">
              Thank you for registering on our secure portal. Please verify your email using the OTP sent to your inbox.
            </p>
            <p className="mt-4">Best regards,</p>
            <p>Secure Portal Team</p>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
