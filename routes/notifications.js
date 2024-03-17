const express = require("express");

const prisma = require("../client"); //import prisma client Instance

const router = express.Router();

//getting all notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await prisma.notification.findMany({
      where: { userId: userId, read: false },
    }); // Fetch all notifications from the database
    res.json(notifications); // Send the fetched notifications as a JSON response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching notifications" }); // Send an error response if something goes wrong
  }
});

//creating a notification
router.post("/", async (req, res) => {
  const notificationData = req.body; // Get the notification data from the request body
  try {
    const newNotification = await prisma.notification.create({
      data: notificationData,
    }); // Create a new notification in the database with the provided data
    res.json(newNotification); // Send the created notification as a JSON response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating notification" }); // Send an error response if something goes wrong
  }
});

// updating a notification
router.patch("/:id", async (req, res) => {
  const id = req.params.id; // Get the ID from the request parameters
  const updates = req.body; // Get the updates from the request body
  try {
    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: updates,
    }); // Update the notification in the database with the provided updates
    res.json(updatedNotification); // Send the updated notification as a JSON response
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
      res.status(404).json({ error: "Notification not found" }); // Send an error response if no notification is not found
    } else {
      res.status(500).json({ error: "Error updating Notification" }); // Send an error response if something else goes wrong
    }
  }
});

module.exports = router;
