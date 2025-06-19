const Candidate = require('../models/Candidate'); //Import model
const path = require('path');
const fs = require('fs');

// 2️⃣ Add new candidate
exports.createCandidate = async (req, res) => {
  
  try {
    const { name, email, phone, jobTitle } = req.body;
    let resumePath = '';

    if (req.file) {
      resumePath = req.file.path;
    }

    const newCandidate = new Candidate({
      name,
      email,
      phone,
      jobTitle,
      resume: resumePath
    });

    await newCandidate.save(); // 3️⃣ Save to DB
    res.status(201).json(newCandidate); // 4️⃣ Send back data
  } catch (error) {
    res.status(500).json({ message: 'Error creating candidate', error });
  }
};

// 5️⃣ Get all candidates
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching candidates', error });
  }
};

// 6️⃣ Update status
exports.updateCandidateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const candidate = await Candidate.findByIdAndUpdate(id, { status }, { new: true });

    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error });
  }
};
