const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { format } = require("date-fns");

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    published: { type: Boolean, required: true },
  },
  {
    toJSON: { virtuals: true },
  }
);
PostSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});
PostSchema.virtual("formattedDate").get(function () {
  return format(this.date, "dd LLL");
});
module.exports = mongoose.model("Post", PostSchema);
