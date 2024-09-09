const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {

  await prisma.properties.deleteMany();

  await prisma.properties.createMany({
    data: [
        {title:"TAR Villas", auction_date:new Date("2024-09-02 00:00:00"), city:"Ampang", address:"TAR Villas, Off Jalan 4K, 68000 Ampang, Selangor", reserve_price:4800000, estimate_price:6000000, size:10473, type:"2 Storey Detached House", tenure:"Leasehold", image_url:"placeholder.webp"},
        {title:"Pangsapuri Seri Mutiara", auction_date:new Date("2024-09-03 00:00:00"), city:"Masai", address:"Pangsapuri Seri Mutiara, Bandar Seri Alam, 81750 Masai, Johor", reserve_price:324000, estimate_price:null, size:1324, type:"Condominium", tenure:"Freehold", image_url:"placeholder.webp"},
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });