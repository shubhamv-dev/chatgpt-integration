// pages/api/upload.js
import multer from 'multer';

// Create a Multer instance to handle the file upload
const upload = multer({ dest: 'uploads/' });

export default function handler(req, res) {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading file' });
    }

    // Here, you can perform additional processing or save the file
    // For now, we'll just return the file details
    return res.status(200).json({ filename: req.file.filename });
  });
}
