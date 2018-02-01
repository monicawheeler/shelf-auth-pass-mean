const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Mongoose Schema
const itemSchema = new Schema ({
  description: {type: String},
  imgUrl: {type: String, required: true}
});

const PersonSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  shelfItem: [{type: mongoose.Schema.ObjectId, ref: 'Item'}]
});

let Person = mongoose.model('Person', PersonSchema);
let Item = mongoose.model('Item', itemSchema);

module.exports = {Person, Item};
