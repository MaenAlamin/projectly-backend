const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const prisma = require("../client");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // If the credentials are valid, return the user information
      res.json({ id: user.id, name: user.name, email: user.email });
    } else {
      // If the credentials are invalid, return an error
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
