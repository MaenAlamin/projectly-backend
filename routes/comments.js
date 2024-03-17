const express = require("express");

const prisma = require("../client"); //import prisma client Instance

const router = express.Router();

//getting all comments for a project
router.get("/:projectId", async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const comments = await prisma.comment.findMany({
      where: { projectId: projectId },
    }); // Fetch all comments from the database
    res.json(comments); // Send the fetched comments as a JSON response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching comments" }); // Send an error response if something goes wrong
  }
});

//creating a comment
router.post("/", async (req, res) => {
  const commentData = req.body; // Get the comment data from the request body
  try {
    const newComment = await prisma.comment.create({ data: commentData }); // Create a new comment in the database with the provided data
    res.json(newComment); // Send the created comment as a JSON response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating comment" }); // Send an error response if something goes wrong
  }
});

module.exports = router;
