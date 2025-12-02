import React from "react";

const EmailPreview = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg max-w-2xl w-full p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
          📬 Email Preview – OTP Confirmation
        </h2>
        <p className="text-gray-600">
          Dear <span className="font-medium">User</span>,
        </p>
        <p className="text-gray-600">
          Thank you for registering with our portal. Please use the following
          One Time Password (OTP) to verify your email address and activate
          your account:
        </p>
        <div className="text-center text-3xl font-bold text-blue-600 py-4">
          123456
        </div>
        <p className="text-gray-600">
          This OTP is valid for 5 minutes. Do not share it with anyone.
        </p>
        <div className="text-gray-500 text-sm pt-4 border-t">
          This is a simulated email preview. No email was actually sent.
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
