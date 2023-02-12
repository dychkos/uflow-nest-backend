// import { PrismaClient } from '@prisma/client';
//
// const prisma = new PrismaClient();
//
// async function main() {
//   await prisma.day.deleteMany();
//   await prisma.day.createMany({
//     data: [
//       { id: 1, value: 'Monday' },
//       { id: 2, value: 'Tuesday' },
//       { id: 3, value: 'Wednesday' },
//       { id: 4, value: 'Thursday' },
//       { id: 5, value: 'Friday' },
//       { id: 6, value: 'Saturday' },
//       { id: 7, value: 'Sunday' },
//     ],
//   });
//   console.log('days seeded');
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
