const express = require("express");

const prisma = require("../client"); //import prisma client Instance

const router = express.Router();

//getting all users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // Fetch all users from the database
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
    const user = await prisma.user.findUnique({ where: { id: userId } }); // Fetch all users from the database
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
    const user = await prisma.user.findUnique({ where: { email: userEmail } }); // Fetch all users from the database
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

//creating a user
router.post("/", async (req, res) => {
  const userData = req.body; // Get the user data from the request body
  try {
    if (!userData.roleId) {
      const defaultRole = await prisma.role.findFirst({
        where: { id: "clsoss3l00000q0udjipni7si" },
      });
      if (defaultRole) {
        userData.roleId = defaultRole.id;
      }
    }
    const newUser = await prisma.user.create({ data: userData }); // Create a new user in the database with the provided data
    res.json(newUser); // Send the created user as a JSON response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating user" }); // Send an error response if something goes wrong
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
