'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function loginAdmin(formData) {
    const password = formData.get('password');

    if (password === 'GENI4christ') {
        const cookieStore = await cookies();
        cookieStore.set('admin_session', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        redirect('/admin');
    } else {
        redirect('/admin/login?error=1');
    }
}


export async function createEpisode(formData) {
    const title = formData.get('title');
    const description = formData.get('description');
    const coverImageFile = formData.get('coverImage');
    const audioFile = formData.get('audioFile');

    let coverImagePath = '/globe.svg';
    let audioPath = '';

    const uploadDir = join(process.cwd(), 'public', 'uploads');

    // Ensure directory exists
    try {
        await mkdir(uploadDir, { recursive: true });
    } catch (e) { }

    // Handle Cover Image Upload
    if (coverImageFile && coverImageFile.size > 0) {
        const bytes = await coverImageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${coverImageFile.name.replace(/\s+/g, '-')}`;
        const filepath = join(uploadDir, filename);
        await writeFile(filepath, buffer);
        coverImagePath = `/uploads/${filename}`;
    }

    // Handle Audio File Upload
    if (audioFile && audioFile.size > 0) {
        const bytes = await audioFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${audioFile.name.replace(/\s+/g, '-')}`;
        const filepath = join(uploadDir, filename);
        await writeFile(filepath, buffer);
        audioPath = `/uploads/${filename}`;
    }

    // Create Record
    await prisma.episode.create({
        data: {
            title,
            description,
            audioUrl: audioPath,
            coverImage: coverImagePath,
            likes: 0
        }
    });

    revalidatePath('/episodes');
    revalidatePath('/admin');
    revalidatePath('/');

    redirect('/admin');
}

export async function deleteEpisode(id) {
    await prisma.comment.deleteMany({
        where: { episodeId: id }
    });

    await prisma.episode.delete({
        where: { id }
    });

    revalidatePath('/episodes');
    revalidatePath('/admin');
}

export async function postComment(formData) {
    const episodeId = parseInt(formData.get('episodeId'), 10);
    const content = formData.get('content');
    const author = formData.get('author') || 'Anonymous';

    if (!content || !episodeId) return;

    await prisma.comment.create({
        data: {
            episodeId,
            content,
            author,
            isAdmin: false
        }
    });

    revalidatePath(`/episodes/${episodeId}`);
}

export async function likeEpisode(episodeId) {
    await prisma.episode.update({
        where: { id: episodeId },
        data: {
            likes: {
                increment: 1
            }
        }
    });

    revalidatePath(`/episodes/${episodeId}`);
    revalidatePath('/admin');
}

export async function subscribeNewsletter(formData) {
    const email = formData.get('email');
    if (!email) return { error: 'Email is required' };

    try {
        await prisma.subscriber.create({
            data: { email }
        });
        return { success: true };
    } catch (e) {
        if (e.code === 'P2002') {
            return { error: 'You are already subscribed!' };
        }
        return { error: 'Something went wrong. Please try again.' };
    }
}

export async function trackPlay(episodeId) {
    await prisma.episode.update({
        where: { id: episodeId },
        data: {
            plays: {
                increment: 1
            }
        }
    });

    revalidatePath(`/episodes/${episodeId}`);
    revalidatePath('/admin');
}
