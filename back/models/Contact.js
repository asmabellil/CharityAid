var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Contact = new Schema(
  {
    Id: String,
    Name: String,
    Type: String,
    Responsible: String,
    Adress: String,
    Phone: Number,
    Email: String,
    Association : String,
    IdAssociation: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("contacts", Contact);