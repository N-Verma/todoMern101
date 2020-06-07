const mongoose = require("mongoose");
const schema = mongoose.Schema;

let Todo = new schema({
  // todo:[{
  value: String,
  due_date: Date,
  category: String,
  done: Boolean,
  //}]
});

module.exports = mongoose.model("Todo", Todo);
