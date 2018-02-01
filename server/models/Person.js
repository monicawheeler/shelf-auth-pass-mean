const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema ({
  description: {type: String},
  imgUrl: {type: String, required: true}
});
// Mongoose Schema
const PersonSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  shelfItem: [itemSchema]
});

module.exports = mongoose.model('Person', PersonSchema);
