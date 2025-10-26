const mongoose = require("mongoose");
const Listing = require("./models/listing");
const { data } = require("./init/data.js");

// 🧠 Connect to your local MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wanderlust")
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ Connection Error:", err);
  });

const seedDB = async () => {
  try {
    // Delete old listings
    await Listing.deleteMany({});
    console.log("🗑️ Old listings deleted");

    // Insert all sample listings from data.js
    await Listing.insertMany(data);
    console.log("🌱 New listings added successfully!");
  } catch (err) {
    console.error("⚠️ Error inserting data:", err);
  }
};

// Run seeding and close connection
seedDB().then(() => {
  mongoose.connection.close();
});

