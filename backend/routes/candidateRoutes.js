const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createCandidate, getAllCandidates, updateCandidateStatus } = require('../controllers/candidateController');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage: storage });

// POST: Refer a new candidate (with resume upload)
router.post('/', upload.single('resume'), createCandidate);

// GET: Fetch all referred candidates
router.get('/', getAllCandidates);

// PUT: Update status of a candidate
router.put('/:id', updateCandidateStatus);

module.exports = router;
