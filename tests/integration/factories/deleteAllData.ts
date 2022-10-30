import { prisma } from "../../../database.js"

export async function deleteAllData() {
    await prisma.$transaction([
      prisma.$executeRaw`TRUNCATE TABLE "Cep" RESTART IDENTITY`
    ]);
  }