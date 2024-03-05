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
app.use("/users", usersRoutes);

const rolesRoutes = require("./routes/roles");
app.use("/roles", rolesRoutes);

const projectsRoutes = require("./routes/projects");
app.use("/projects", projectsRoutes);

const tasksRoutes = require("./routes/tasks");
app.use("/tasks", tasksRoutes);

app.listen(10000, () => {
  console.log("server started");
});
