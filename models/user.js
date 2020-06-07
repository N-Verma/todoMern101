const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const schema = mongoose.Schema;

let User = new schema({
  username: String,
  email: String,
  password: String,
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);
