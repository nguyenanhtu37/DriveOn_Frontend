import axios from "axios";

const CLOUD_NAME = "dycsfoejy";
const UPLOAD_PRESET = "drive_on_image";
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

export const uploadImage = async (file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axios.post(UPLOAD_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 100)
        );
        onProgress(percent);
      },
    });

    return response.data.secure_url;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
