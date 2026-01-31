import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { deleteEpisode } from '@/app/actions';
import styles from './admin.module.css';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const episodes = await prisma.episode.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const subscribers = await prisma.subscriber.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Admin Dashboard</h1>
                <Link href="/admin/create" className={styles.createBtn}>
                    + Create New Episode
                </Link>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Episode Analytics</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th width="80">Image</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Stats</th>
                                <th width="100">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {episodes.map(ep => (
                                <tr key={ep.id}>
                                    <td>
                                        <Image
                                            src={ep.coverImage}
                                            alt=""
                                            width={50}
                                            height={50}
                                            className={styles.thumbnail}
                                        />
                                    </td>
                                    <td>{ep.title}</td>
                                    <td>{new Date(ep.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <div className={styles.stats}>
                                            <span>♥ {ep.likes} Likes</span>
                                            <span>🎧 {ep.plays} Plays</span>
                                        </div>
                                    </td>
                                    <td>
                                        <form action={deleteEpisode.bind(null, ep.id)}>
                                            <button type="submit" className={styles.deleteBtn}>
                                                Delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={styles.section} style={{ marginTop: '3rem' }}>
                <h2 className={styles.sectionTitle}>Newsletter Subscribers ({subscribers.length})</h2>
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Email Address</th>
                                <th>Subscribed Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribers.map(sub => (
                                <tr key={sub.id}>
                                    <td>{sub.email}</td>
                                    <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {subscribers.length === 0 && (
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'center', padding: '2rem' }}>
                                        No subscribers yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
