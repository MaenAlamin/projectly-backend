const express = require("express");
const prisma = require("../client"); //import prisma client Instance
const router = express.Router();

const bcrypt = require("bcryptjs");

//getting all users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { tasks: true },
    }); // Fetch all users from the database
    res.json(users); // Send the fetched users as a JSON response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching users" }); // Send an error response if something goes wrong
  }
});

//getting a user by id
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the request parameters
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { tasks: true },
    }); // Fetch all users from the database
    if (user) {
      res.json(user); // Send the fetched user as a JSON response
    } else {
      res.status(404).json({ error: "User not found" }); // Send an error response if no user is found
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching users" }); // Send an error response if something goes wrong
  }
});

//getting a user by email
router.get("/:email", async (req, res) => {
  try {
    const userEmail = req.params.email; // Get the user email from the request parameters
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    }); // Fetch all users from the database
    if (user) {
      res.json(user); // Send the fetched user as a JSON response
    } else {
      res.status(404).json({ error: "User not found" }); // Send an error response if no user is found
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching users" }); // Send an error response if something goes wrong
  }
});

//create a user with password
router.post("/", async (req, res) => {
  try {
    // Extract user data from request body
    const { name, password, email, role } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

    // Create a new user with the hashed password
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        role: role || "Employee", // Use provided role or use a default role (Employee)
        // Include other necessary fields
      },
    });
    // Save the user to the database
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", error });
  }
});

//updating a user
router.patch("/:id", async (req, res) => {
  const id = req.params.id; // Get the ID from the request parameters
  const updates = req.body; // Get the updates from the request body
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updates,
    }); // Update the user in the database with the provided updates
    res.json(updatedUser); // Send the updated user as a JSON response
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
      res.status(404).json({ error: "User not found" }); // Send an error response if no user is found
    } else {
      res.status(500).json({ error: "Error updating user" }); // Send an error response if something else goes wrong
    }
  }
});

//deleting a user
router.delete("/:id", async (req, res) => {
  const id = req.params.id; // Get the ID from the request parameters
  try {
    const deletedUser = await prisma.user.delete({ where: { id } }); // Delete the user from the database
    res.json(deletedUser); // Send the deleted user as a JSON response
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
      res.status(404).json({ error: "User not found" }); // Send an error response if no user is found
    } else {
      res.status(500).json({ error: "Error updating user" }); // Send an error response if something else goes wrong
    }
  }
});

module.exports = router;
