const axios = require("axios");
const cloudinary = require("cloudinary");

function fileUploadMiddleware(req, res) {
  cloudinary.uploader
    .upload_stream(req.file, (result) => {
      console.log(result);
    })
    .end(req.file.buffer);
}

module.exports = fileUploadMiddleware;
