const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.comment.deleteMany();
    await prisma.episode.deleteMany();

    // Create Episodes
    const ep1 = await prisma.episode.create({
        data: {
            title: "S1 E1: The Power of Vulnerability",
            description: "In our debut episode, we dive deep into how social media impacts intimacy and why being open is your greatest strength.",
            coverImage: "/hero.jpg",
            audioUrl: "/uploads/dummy-audio.mp3",
            likes: 124,
            comments: {
                create: [
                    {
                        author: "Sarah J.",
                        content: "This episode really spoke to me! I've been feeling exactly this way about dating apps.",
                    },
                    {
                        author: "GEN-I Host",
                        content: "So glad it resonated with you Sarah! Thanks for listening 💛",
                        isAdmin: true
                    }
                ]
            }
        }
    });

    const ep2 = await prisma.episode.create({
        data: {
            title: "S1 E2: Navigating Modern Dating",
            description: "Ghosting, breadcrumbing, and sliding into DMs. We break down the chaos of dating in the digital age.",
            coverImage: "/logo.png",
            audioUrl: "/uploads/dummy-audio.mp3",
            likes: 89,
            comments: {
                create: [
                    {
                        author: "User123",
                        content: "Can't wait for the next one.",
                    }
                ]
            }
        }
    });

    const ep3 = await prisma.episode.create({
        data: {
            title: "S1 E3: Mental Health & Relationships",
            description: "How to support a partner struggling with mental health while maintaining your own boundaries.",
            coverImage: "/hero.jpg",
            audioUrl: "/uploads/dummy-audio.mp3",
            likes: 256
        }
    });

    console.log({ ep1, ep2, ep3 });
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
