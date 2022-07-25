

//
//
// Boilder Plate ENV and Connection Setup

const { config } = require('dotenv');
const mongoose = require('mongoose');

require('dotenv').config();

console.log("\x1b[43mMONGODB_URI: " + process.env.MONGODB_URI + "\x1b[0m");

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/babble_DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;

//!========================= EOF =========================