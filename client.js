const { PrismaClient } = require("@prisma/client"); // Import Prisma Client

let prisma = new PrismaClient();

module.exports = prisma;
