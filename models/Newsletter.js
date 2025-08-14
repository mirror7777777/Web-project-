const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
