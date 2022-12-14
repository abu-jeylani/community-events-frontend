import { useState } from "react";
import { API_URL } from "@/config/index";

export default function ImageUpload({ evtId, imageUploaded, token }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "api::event.event");
    formData.append("refId", evtId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div>
      <h1 className="text-2xl text-slate-800">Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className="border border-solid border-gray-700 bg-slate-900 text-white">
          <input type="file" onChange={handleFileChange} />
        </div>
        <input
          type="submit"
          value="Upload"
          className="mt-4 text-white shadow-sm shadow-slate-800 text-xs bg-slate-900 hover:bg-slate-700 px-4 py-3 rounded-2xl"
        />
      </form>
    </div>
  );
}
