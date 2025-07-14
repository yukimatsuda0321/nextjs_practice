import { PrismaClient } from '@prisma/client' 
import * as bcrypt from 'bcryptjs' 
const prisma = new PrismaClient() 

async function main(){
    await prisma.post.deleteMany() // 既存の投稿を削除
    await prisma.user.deleteMany() // 既存のユーザーを削除

    const hashedPassword = await bcrypt.hash('password123', 12) 

     const dummyImages = [ 'https://picsum.photos/seed/post1/600/400', // ダミー画像 
    'https://picsum.photos/seed/post2/600/400' ] 

    const user = await prisma.user.create({ 
        data: { 
        email: 'test@example.com', 
        name: 'Test User', 
        iconImage: dummyImages[0], 
        password: hashedPassword, 
        posts: { 
        create: [ 
        {   content: 'これは最初のブログ投稿です。Next.jsとPrismaでブログを作成しています。', 
            topImage: dummyImages[1], 
            published: true, 
        }, 
        {   content: 'クソ眠', 
            topImage: dummyImages[2], 
            published: true, 
        }  ] } } }) 
    console.log({ user }) 

}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })