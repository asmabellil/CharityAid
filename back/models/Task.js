var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Task = new Schema(
  {
    Id: String,
    Title: String,
    Description: String,
    Progress: String,
    DL: String,
    IdEvent: String,
    Archive: String,
    MemberName: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", Task);