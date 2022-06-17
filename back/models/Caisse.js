var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Caisse = new Schema(
  {
    Id: String,
    Montant: Number,
    Type: String,
    Category: String,
    SubCategory: String,
    Description: String,
    Association : String,
    IdAssociation: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("caisse", Caisse);