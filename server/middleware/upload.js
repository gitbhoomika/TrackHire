const multer = require("multer");

// Store uploaded file in memory (RAM)
const storage = multer.memoryStorage();

// Create multer middleware
const upload = multer({
    storage: storage,
});

module.exports = upload;