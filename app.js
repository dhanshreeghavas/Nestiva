const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Database
main()
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// View engine (ORDER MATTERS)
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));



// Routes
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
});

app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

app.get("/listings/:id", async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  res.render("listings/show", { listing });
});

app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

app.get("/listings/:id/edit", async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  res.render("listings/edit", { listing });
});

app.put("/listings/:id", async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.id, req.body.listing);
  res.redirect(`/listings/${req.params.id}`);
});

app.delete("/listings/:id", async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  res.redirect("/listings");
});

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
