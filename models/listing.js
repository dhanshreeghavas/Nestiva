const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      required: true,
    },
  },
  price: Number,
  location: String,
  country: String,
});

module.exports = mongoose.model("Listing", listingSchema);
