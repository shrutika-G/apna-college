const mongoose = require("mongoose");
const Listing = require("./models/listing");
const data = require("./init/data");

// 🧠 Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.log("❌ Connection Error:", err);
  });

const seedDB = async () => {
  try {
    // Remove old listings
    await Listing.deleteMany({});
    console.log("🗑️ Old listings deleted");

    // Insert new ones from data.js
    await Listing.insertMany(data);
    console.log("🌱 Database seeded successfully");
  } catch (err) {
    console.error("⚠️ Seeding error:", err);
  }
};

// Run the seed function
seedDB().then(() => {
  mongoose.connection.close();
});
