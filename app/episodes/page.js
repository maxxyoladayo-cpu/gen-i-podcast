import prisma from '@/lib/prisma';
import SearchFilter from '@/components/SearchFilter';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function EpisodesPage() {
  const episodes = await prisma.episode.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>All Episodes</h1>
        <p className={styles.subtitle}>Listen to the latest conversations.</p>
      </div>

      <SearchFilter initialEpisodes={episodes} />
    </div>
  );
}
