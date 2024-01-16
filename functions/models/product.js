const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    description: String,
    image: String,
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Product", productSchema);
