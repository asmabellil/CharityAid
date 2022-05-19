var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Subscriber = new Schema(
  {
    Id: String,
    FirstName: String,
    LastName: String,
    Picture: String,
    DOB: String,
    Adress: String,
    Phone: String,
    Email: String,
    IdAssociation: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("subscriber", Subscriber);