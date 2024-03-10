const express = require("express");

const prisma = require("../client"); //import prisma client Instance

const router = express.Router();

//getting all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany(); // Fetch all tasks from the database
    res.json(tasks); // Send the fetched tasks as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" }); // Send an error response if something goes wrong
  }
});

//getting a task by id
router.get("/:id", async (req, res) => {
  try {
    const taskId = req.params.id; // Get the task ID from the request parameters
    const task = await prisma.task.findUnique({ where: { id: taskId } }); // Fetch all tasks from the database
    if (task) {
      res.json(task); // Send the fetched task as a JSON response
    } else {
      res.status(404).json({ error: "Task not found" }); // Send an error response if no task is found
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching tasks" }); // Send an error response if something goes wrong
  }
});

//creating a task
router.post("/", async (req, res) => {
  const taskData = req.body; // Get the task data from the request body
  try {
    const newTask = await prisma.task.create({ data: taskData }); // Create a new task in the database with the provided data
    res.json(newTask); // Send the created task as a JSON response
  } catch (error) {
    res.status(500).json({ error: "Error creating task" }); // Send an error response if something goes wrong
  }
});

//updating a task
router.patch("/:id", async (req, res) => {
  const id = req.params.id; // Get the ID from the request parameters
  const updates = req.body; // Get the updates from the request body
  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: updates,
    }); // Update the task in the database with the provided updates
    res.json(updatedTask); // Send the updated task as a JSON response
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Task not found" }); // Send an error response if no task is found
    } else {
      res.status(500).json({ error: "Error updating task" }); // Send an error response if something else goes wrong
    }
  }
});

//deleting a task
router.delete("/:id", async (req, res) => {
  const id = req.params.id; // Get the ID from the request parameters
  try {
    const deletedTask = await prisma.task.delete({ where: { id } }); // Delete the task from the database
    res.json(deletedTask); // Send the deleted task as a JSON response
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Task not found" }); // Send an error response if no task is found
    } else {
      res.status(500).json({ error: "Error updating task" }); // Send an error response if something else goes wrong
    }
  }
});

module.exports = router;
