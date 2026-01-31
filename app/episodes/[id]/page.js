import { notFound } from 'next/navigation';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import AudioPlayer from '@/components/AudioPlayer';
import CommentSection from '@/components/CommentSection';
import styles from './page.module.css';
import { likeEpisode } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default async function SingleEpisodePage({ params }) {
  // Await params for Next.js 15+ compatibility
  const { id } = await params;
  const episodeId = parseInt(id, 10);

  if (isNaN(episodeId)) {
    notFound();
  }

  const episode = await prisma.episode.findUnique({
    where: { id: episodeId },
    include: {
      comments: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!episode) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.episodeHeader}>
        <div className={styles.coverWrapper}>
          <Image
            src={episode.coverImage}
            alt={episode.title}
            width={400}
            height={400}
            className={styles.cover}
            priority
          />
        </div>

        <div className={styles.info}>
          <span className={styles.date}>{new Date(episode.createdAt).toLocaleDateString()}</span>
          <h1 className={styles.title}>{episode.title}</h1>
          <p className={styles.description}>{episode.description}</p>

          <div className={styles.actions}>
            <form action={likeEpisode.bind(null, episode.id)}>
              <button type="submit" className={styles.likeBtn}>
                ♥ {episode.likes} Likes
              </button>
            </form>
            <button className={styles.shareBtn}>Share Episode</button>
          </div>

          <AudioPlayer title={episode.title} src={episode.audioUrl} episodeId={episodeId} />
        </div>
      </div>

      <CommentSection comments={episode.comments} episodeId={episodeId} />
    </div>
  );
}
