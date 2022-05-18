var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Caisse = new Schema(
  {
    Id: String,
    Montant: String,
    Type: String,
    Source: String,
    Description: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("caisse", Caisse);