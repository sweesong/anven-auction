const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {

  await prisma.properties.deleteMany();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });