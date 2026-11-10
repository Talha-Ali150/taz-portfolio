import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";

const API = process.env.REACT_APP_API_URL || "";

const ImageUploadControl = ({ purpose, onUploaded }) => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(false);
    setStatus("Optimizing and uploading…");

    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch(`${API}/api/admin/uploads/image?purpose=${purpose}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("The portfolio API is unavailable. Start the backend and try again.");
      }
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Image upload failed.");
      onUploaded(result.url);
      setStatus(`Uploaded and optimized (${Math.max(1, Math.round(result.bytes / 1024))} KB).`);
    } catch (uploadError) {
      setError(true);
      setStatus(uploadError.message || "Image upload failed.");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  };

  return (
    <div className="admin-upload-wrap">
      <label className={`admin-file-input${busy ? " is-busy" : ""}`}>
        <FiUpload aria-hidden="true" /> {busy ? "Uploading…" : "Choose image file"}
        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={busy} onChange={upload} />
      </label>
      <span className={`admin-upload-status${error ? " is-error" : ""}`} role={error ? "alert" : "status"}>{status || "JPG, PNG, WebP, or AVIF · max 8 MB"}</span>
    </div>
  );
};

export default ImageUploadControl;
