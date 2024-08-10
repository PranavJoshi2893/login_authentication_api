const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      firstName: process.env.ADMIN_FIRSTNAME,
      lastName: process.env.ADMIN_LASTNAME,
      email: process.env.ADMIN_EMAIL,
      password: await hash(process.env.ADMIN_PASSWORD, 10),
      verified: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
