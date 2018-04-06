const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  dumnum: {type:Number},
  title: { type: String},
  author: { type: String},
  synopsis: { type: String},
  saved: {type:String},
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;