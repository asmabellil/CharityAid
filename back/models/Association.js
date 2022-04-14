var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Association = new Schema(
  {
    Id: String,
    Name: String,
    Picture: String,
    Foundation_date: String,
    Adress: String,
    Phone: Number,
    Email: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("association", Association);