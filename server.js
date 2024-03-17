require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const usersRoutes = require("./routes/users");
const projectsRoutes = require("./routes/projects");
const tasksRoutes = require("./routes/tasks");
const commentsRoutes = require("./routes/comments");
const notificationsRoutes = require("./routes/notifications");
const validateRoute = require("./routes/validate");

app.use("/users", usersRoutes);
app.use("/projects", projectsRoutes);
app.use("/tasks", tasksRoutes);
app.use("/comments", commentsRoutes);
app.use("/notifications", notificationsRoutes);
app.use("/validate", validateRoute);

app.listen(10000, () => {
  console.log("server started");
});
