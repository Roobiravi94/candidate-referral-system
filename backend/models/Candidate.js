const mongoose = require('mongoose');   //Import mongoose library

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,             // must be text
    required: true            // cannot be empty
  },
  email: {
    type: String,              
    required: true,
    match: /.+\@.+\..+/ // basic email format validation
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/ // 10-digit phone number
  },
  jobTitle: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Pending',             // default value if not given
    enum: ['Pending', 'Reviewed', 'Hired']         // only these values allowed
  },
  resume: {
    type: String       // this will store the file path or URL
  }
}, {
  timestamps: true        // Automatically saves createdAt and updatedAt
});

module.exports = mongoose.model('Candidate', candidateSchema);      // Export this schema so we can use it in other files
