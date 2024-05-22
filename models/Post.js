const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  Title: { type: String, required: true },
  Text: { type: String, required: true },
  Date: { type: Date, default: Date.now },
  Author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  Comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  Published: { type: Boolean, required: true },
});

exports.Post = mongoose.model("Post", postSchema);
