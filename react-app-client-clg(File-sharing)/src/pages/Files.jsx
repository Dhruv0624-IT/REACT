import React, { useState, useEffect } from "react";
import { FaFile, FaDownload, FaTrash, FaUpload, FaEye } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useLog } from "../context/LogContext";

// Helper function to format the ISO timestamp into a readable string
const formatTime = (isoTime) => {
  const date = new Date(isoTime);
  return date.toLocaleString();
};

const Files = () => {
  const { user, fileList, updateFiles } = useAuth();
  const { addLog } = useLog();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null); // State for the file to be previewed

  // Filter files based on user role
  const filesToDisplay = user?.role === 'Admin' ? fileList : fileList.filter(f => f.uploadedBy === user.email);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newFile = {
        id: Date.now(),
        name: selectedFile.name,
        size: selectedFile.size,
        uploadedAt: new Date().toISOString(),
        uploadedBy: user.email,
      };
      updateFiles([...fileList, newFile]);
      addLog(`File uploaded: ${selectedFile.name} by ${user.email}`);
      setSelectedFile(null);
    }
  };

  const handleDownload = (file) => {
    // This is a placeholder since we don't have a real server
    // In a real app, you would fetch the file from the server
    const link = document.createElement("a");
    link.href = "#"; // Replace with actual file URL
    link.download = file.name;
    link.click();
    addLog(`File downloaded: ${file.name} by ${user.email}`);
  };

  const handleDelete = (fileId, fileName) => {
    const updatedFiles = fileList.filter((file) => file.id !== fileId);
    updateFiles(updatedFiles);
    addLog(`File deleted: ${fileName} by ${user.email}`);
  };

  const handlePreview = (file) => {
    setPreviewFile(file);
    addLog(`File previewed: ${file.name} by ${user.email}`);
  };

  const closePreview = () => {
    setPreviewFile(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) {
      return bytes + " Bytes";
    } else if (bytes < 1048576) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else {
      return (bytes / 1048576).toFixed(2) + " MB";
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📂 My Files</h2>
      
      <div className="card p-4 shadow mb-4">
        <h5 className="mb-3">
          <FaUpload /> Upload a new file
        </h5>
        <div className="input-group">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
          <button
            className="btn btn-primary"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload
          </button>
        </div>
      </div>

      {user?.role === 'Admin' ? (
        // Admin View: Display all files in a table
        <div className="card p-3 shadow">
          <h5 className="text-center">🗂️ All Uploaded Files</h5>
          {filesToDisplay.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Size</th>
                    <th>Uploaded By</th>
                    <th>Uploaded At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filesToDisplay.map((file) => (
                    <tr key={file.id}>
                      <td>{file.name}</td>
                      <td>{formatFileSize(file.size)}</td>
                      <td>{file.uploadedBy}</td>
                      <td>{formatTime(file.uploadedAt)}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handlePreview(file)}
                        >
                          <FaEye />
                        </button>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleDownload(file)}
                        >
                          <FaDownload />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(file.id, file.name)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted">No files have been uploaded yet.</p>
          )}
        </div>
      ) : (
        // User View: Display only their own files as cards
        <div className="row g-4">
          {filesToDisplay.length > 0 ? (
            filesToDisplay.map((file) => (
              <div className="col-md-4" key={file.id}>
                <div className="card p-3 shadow text-center">
                  <FaFile size={50} className="mb-3 mx-auto" />
                  <h6 className="card-title">{file.name}</h6>
                  <p className="card-text mb-1">{formatFileSize(file.size)}</p>
                  <p className="card-text mb-3">
                    <small className="text-muted">{formatTime(file.uploadedAt)}</small>
                  </p>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handlePreview(file)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleDownload(file)}
                    >
                      <FaDownload />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(file.id, file.name)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted w-100">You have not uploaded any files yet.</p>
          )}
        </div>
      )}

      {/* File Preview Modal */}
      {previewFile && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Preview: {previewFile.name}</h5>
                <button type="button" className="btn-close" onClick={closePreview}></button>
              </div>
              <div className="modal-body text-center">
                <p>Preview not available for this file type in the mock app.</p>
                <p>File: **{previewFile.name}**</p>
                <p>Size: **{formatFileSize(previewFile.size)}**</p>
                <p>Uploaded by: **{previewFile.uploadedBy}**</p>
                <p>Uploaded on: **{formatTime(previewFile.uploadedAt)}**</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closePreview}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Files;
