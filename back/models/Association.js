var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Association = new Schema(
  {
    Id: String,
    Name: String,
    Picture: String,
    Siret_Number: Number,
    Type: String,
    Responsible: String,
    Username: String,
    Foundation_date: String,
    Adress: String,
    Phone: Number,
    Email: String,
    Valid: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("association", Association);