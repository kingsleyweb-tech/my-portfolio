/**
 * js/cloudinary.js
 * Cloudinary unsigned upload helper.
 * Loaded via <script> AFTER js/config.js.
 *
 * Images are uploaded directly from the browser to Cloudinary.
 * The returned secure_url is then stored in Firestore.
 */

/**
 * Upload a File object to Cloudinary using the unsigned upload preset.
 *
 * @param {File}     file       - The image file to upload.
 * @param {string}   [folder]   - Optional Cloudinary folder (e.g. "portfolio/projects").
 * @param {Function} [onProgress] - Optional callback(percent:number).
 * @returns {Promise<{url: string, publicId: string}>}
 */
async function cloudinaryUpload(file, folder = "portfolio", onProgress = null) {
  const { cloudName, uploadPreset } = window.CONFIG.cloudinary;
  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file",           file);
  formData.append("upload_preset",  uploadPreset);
  formData.append("folder",         folder);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (onProgress) {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
      });
    }

    xhr.open("POST", endpoint);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText);
        resolve({ url: res.secure_url, publicId: res.public_id });
      } else {
        reject(new Error(`Cloudinary upload failed (${xhr.status}): ${xhr.responseText}`));
      }
    };
    xhr.onerror = () => reject(new Error("Network error during Cloudinary upload"));
    xhr.send(formData);
  });
}

window.CloudinaryUpload = cloudinaryUpload;
