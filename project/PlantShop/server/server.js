const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    const existingAdmin = await User.findOne({ role: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("Admin123!", 10);
      const adminUser = await User.create({
        name: "Admin",
        email: "admin@plantshop.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Seeded admin user:", adminUser.email);
    }
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
