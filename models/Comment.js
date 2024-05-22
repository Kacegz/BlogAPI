const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  Text: { type: String, required: true },
  Author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
});

exports.Comment = mongoose.model("Comment", commentSchema);
