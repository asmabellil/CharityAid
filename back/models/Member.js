var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Member = new Schema(
  {
    Id: String,
    FirstName: String,
    LastName: String,
    Picture: String,
    DOB: String,
    Adress: String,
    Phone: Number,
    Association: String,
    Role_Association: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("member", Member);
