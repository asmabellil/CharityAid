var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Event = new Schema(
  {
    Id: String,
    Picture: String,
    Title: String,
    Description: String,
    Start_date: Date,
    End_date: Date,
    Place: String,
    Number_Participants: Number,
    Cout: String,
    IdAssociation: String,
    MemberName: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("event", Event);