// signup
const express = require("express");
const Router = express.Router();
const homeSchema = require("../models/homeSchema");

Router.get("/", (req, res) => {
  res.render("register", { title: "Fill Form", password: "", email: "" });
});

Router.post("/register", async (req, res) => {
  try {
    const { name, number, email, password, cpassword } = req.body;

    // Check if password matches cpassword
    if (password !== cpassword) {
      return res.render("register", {
        title: "Password not matched",
        password: "",
        email: "",
      });
    }

    // Check if email already exists in the database
    const existingUser = await homeSchema.findOne({ email: email });
    if (existingUser) {
      // If email already exists, retrieve and display user information
 // If email already exists, retrieve and display user information
 console.log("User with duplicate email:", existingUser);
 return res.render("register", {
   title: "Duplicate Email",
   password: "",
   email: "",
   duplicateUser: existingUser,
 });
}

// If everything is fine, save the user data
const userData = new homeSchema({
 name,
 number,
 email,
 password,
});

await userData.save();

console.log(userData);

res.render("register", { title: "Done", password: "", email: "" });
} catch (error) {
console.log(error);
res.render("register", { title: "Error in code", password: "", email: "" });
}
});
// sign in
Router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists in the database
    const user = await homeSchema.findOne({ email: email });

    if (user && user.password === password) {
      res.render('dashboard', { name: user.name });
    } else {
      console.log('Login failed: Invalid credentials');
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.log('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = Router;