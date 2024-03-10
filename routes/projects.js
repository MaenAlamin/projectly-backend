const express = require("express");

const prisma = require("../client"); //import prisma client Instance

const router = express.Router();

//getting all projects
router.get("/", async (req, res) => {
  try {
    const projects = await prisma.project.findMany(); // Fetch all projects from the database
    res.json(projects); // Send the fetched projects as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Error fetching projects" }); // Send an error response if something goes wrong
  }
});

//getting a project by id
router.get("/:id", async (req, res) => {
  try {
    const projectId = req.params.id; // Get the project ID from the request parameters
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    }); // Fetch all projects from the database
    if (project) {
      res.json(project); // Send the fetched project as a JSON response
    } else {
      res.status(404).json({ error: "Project not found" }); // Send an error response if no project is found
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching projects" }); // Send an error response if something goes wrong
  }
});

//creating a project
router.post("/", async (req, res) => {
  const projectData = req.body; // Get the project data from the request body
  try {
    const newProject = await prisma.project.create({ data: projectData }); // Create a new project in the database with the provided data
    res.json(newProject); // Send the created project as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Error creating project" }); // Send an error response if something goes wrong
  }
});

//updating a project
router.patch("/:id", async (req, res) => {
  const id = req.params.id; // Get the ID from the request parameters
  const updates = req.body; // Get the updates from the request body
  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: updates,
    }); // Update the project in the database with the provided updates
    res.json(updatedProject); // Send the updated project as a JSON response
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Project not found" }); // Send an error response if no project is found
    } else {
      res.status(500).json({ error: "Error updating project" }); // Send an error response if something else goes wrong
    }
  }
});

//deleting a project
router.delete("/:id", async (req, res) => {
  const id = req.params.id; // Get the ID from the request parameters
  try {
    const deletedProject = await prisma.project.delete({ where: { id } }); // Delete the project from the database
    res.json(deletedProject); // Send the deleted project as a JSON response
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Project not found" }); // Send an error response if no project is found
    } else {
      res.status(500).json({ error: "Error updating project" }); // Send an error response if something else goes wrong
    }
  }
});

module.exports = router;
