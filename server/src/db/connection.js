const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const res = await mongoose.connect('mongodb://127.0.0.1:27017/SajiloMartdb', {
     
    });
    if (res) console.log("Database connection successful");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

module.exports = dbConnect;