const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const careerSchema = new Schema({
  name: { type: String },
  code: {type: Number},
  description: {type: String}
});

module.exports = mongoose.model('careers', careerSchema);