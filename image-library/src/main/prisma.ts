import { PrismaClient } from "@prisma/client";

// Singleton instance of Prisma Client; used across the app to avoid creating multiple instances in every file that needs PrismaClient.
export const prisma = new PrismaClient();