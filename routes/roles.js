const express = require("express");
const { PrismaClient } = require("@prisma/client"); // Import Prisma Client
const prisma = new PrismaClient(); // Instantiate Prisma Client

const router = express.Router();

//getting all roles
router.get("/", async (req, res) => {
  try {
    const roles = await prisma.role.findMany(); // Fetch all roles from the database
    res.json(roles); // Send the fetched roles as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Error fetching roles" }); // Send an error response if something goes wrong
  }
});

//getting a role by id
router.get("/:id", async (req, res) => {
  try {
    const roleId = req.params.id; // Get the role ID from the request parameters
    const role = await prisma.role.findUnique({
      where: { id: roleId },
    }); // Fetch all roles from the database
    if (role) {
      res.json(role); // Send the fetched role as a JSON response
    } else {
      res.status(404).json({ error: "Role not found" }); // Send an error response if no role is found
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching roles" }); // Send an error response if something goes wrong
  }
});

//creating a role
router.post("/", async (req, res) => {
  const roleData = req.body; // Get the role data from the request body
  try {
    const newRole = await prisma.role.create({ data: roleData }); // Create a new role in the database with the provided data
    res.json(newRole); // Send the created role as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Error creating role" }); // Send an error response if something goes wrong
  }
});

//updating a role
router.patch("/:id", async (req, res) => {
  const id = req.params.id; // Get the ID from the request parameters
  const updates = req.body; // Get the updates from the request body
  try {
    const updatedRole = await prisma.role.update({
      where: { id },
      data: updates,
    }); // Update the role in the database with the provided updates
    res.json(updatedRole); // Send the updated role as a JSON response
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Role not found" }); // Send an error response if no role is found
    } else {
      res.status(500).json({ error: "Error updating role" }); // Send an error response if something else goes wrong
    }
  }
});

//deleting a role
router.delete("/:id", async (req, res) => {
  const id = req.params.id; // Get the ID from the request parameters
  try {
    const deletedRole = await prisma.role.delete({ where: { id } }); // Delete the role from the database
    res.json(deletedRole); // Send the deleted role as a JSON response
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Role not found" }); // Send an error response if no role is found
    } else {
      res.status(500).json({ error: "Error updating role" }); // Send an error response if something else goes wrong
    }
  }
});

module.exports = router;
