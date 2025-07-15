import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

function getRandomDateInPast(daysBack: number) {
  const now = new Date();
  const pastTime = now.getTime() - Math.floor(Math.random() * daysBack * 24 * 60 * 60 * 1000);
  return new Date(pastTime);
}

async function main() {
  await prisma.post.deleteMany(); // 既存の投稿を削除
  await prisma.user.deleteMany(); // 既存のユーザーを削除

  const hashedPassword = await bcrypt.hash('password123', 12);

  const dummyImages = [
    'https://picsum.photos/seed/post1/600/400', // ダミー画像
    'https://picsum.photos/seed/post2/600/400',
  ];

  const user = await prisma.user.create({
    data: {
      email: 'matuda@gmail.com',
      name: '松田',
      iconImage: dummyImages[0],
      password: hashedPassword,
      posts: {
        create: [
          {
            content: 'Patient demonstrates improved gait symmetry and increased stride length compared to the previous session.',
            topImage: dummyImages[1],
            published: true,
            createdAt: getRandomDateInPast(30),
          },
          {
            content: 'Mild right knee valgus noted during stance phase; recommend targeted strengthening for hip abductors.',
            topImage: dummyImages[1],
            published: true,
            createdAt: getRandomDateInPast(30),
          },
          {
            content: 'Patient continues to exhibit foot drop on the left side; AFO use advised for community ambulation.',
            topImage: dummyImages[1],
            published: true,
            createdAt: getRandomDateInPast(30),
          },
          {
            content: 'Increased cadence and reduced toe-off delay observed with verbal cues and tactile facilitation.',
            topImage: dummyImages[1],
            published: true,
            createdAt: getRandomDateInPast(30),
          },
          {
            content: 'Pelvic stability remains a challenge during single-leg stance; core stabilization exercises prescribed.',
            topImage: dummyImages[1],
            published: true,
            createdAt: getRandomDateInPast(30),
          },
          {
            content: 'Patient shows adequate dorsiflexion during swing but lacks terminal knee extension in stance.',
            topImage: dummyImages[1],
            published: true,
            createdAt: getRandomDateInPast(30),
          },
          {
            content: 'Weight shifting to the left side improved; however, mild trunk lean persists with fatigue.',
            topImage: dummyImages[1],
            published: true,
            createdAt: getRandomDateInPast(30),
          },
          {
            content: 'Balance during turning improved significantly; recommend progression to outdoor uneven surfaces.',
            topImage: dummyImages[1],
            published: true,
            createdAt: getRandomDateInPast(30),
          },
        ],
      },
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
