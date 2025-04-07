// src/components/Brand/BrandFormDialog.jsx
import { useState, useEffect } from "react";
import useUpload from "@/app/services/Cloudinary/upload";

const BrandFormDialog = ({ onSubmit, onClose, initialData }) => {
  const [brandName, setBrandName] = useState(initialData?.brandName || "");
  const [logo, setLogo] = useState(initialData?.logo || "");
  const [preview, setPreview] = useState(initialData?.logo || "");

  const {
    files,
    progressList,
    handleFileChange,
    handleUpload,
    handleRemove,
  } = useUpload();

  useEffect(() => {
    if (files.length > 0) {
      setPreview(URL.createObjectURL(files[0]));
    }
  }, [files]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brandName) return;

    let uploadedLogo = logo;

    if (files.length > 0) {
      const urls = await handleUpload();
      if (urls && urls.length > 0) {
        uploadedLogo = urls[0];
        setLogo(uploadedLogo);
      } else {
        return; // lỗi upload
      }
    }

    if (!uploadedLogo) return;

    onSubmit({ brandName, logo: uploadedLogo });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Sửa thương hiệu" : "Thêm thương hiệu"}
        </h2>

        <input
          className="border p-2 rounded w-full mb-3"
          placeholder="Tên thương hiệu"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="mb-3"
          onChange={handleFileChange}
        />

        {files.length > 0 && (
          <div className="mb-3">
            {files.map((file) => (
              <div key={file.name} className="flex items-center justify-between mb-1">
                <span className="text-sm">{file.name}</span>
                <button
                  type="button"
                  className="text-red-500 text-sm"
                  onClick={() => handleRemove(file)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        {preview && (
          <img src={preview} alt="Logo preview" className="w-24 h-24 object-contain mb-3" />
        )}

        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="text-gray-500">
            Hủy
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandFormDialog;
