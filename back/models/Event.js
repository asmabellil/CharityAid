var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Event = new Schema(
  {
    Id: String,
    Picture: String,
    Title: String,
    Description: String,
    Start_date: String,
    End_date: String,
    Place: String,
    Number_Participants: Number,
    Cout: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("event", Event);