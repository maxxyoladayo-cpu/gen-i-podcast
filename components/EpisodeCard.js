'use client';

import Link from 'next/link';
import Image from 'next/image';
import { likeEpisode } from '@/app/actions';

export default function EpisodeCard({ episode }) {
  return (
    <div className="card">
      <div className="image-wrapper">
        <Image
          src={episode.coverImage || '/logo.png'}
          alt={episode.title}
          width={400}
          height={300}
          className="cover-image"
        />
        <div className="play-overlay">
          <Link href={`/episodes/${episode.id}`} className="play-icon">▶</Link>
        </div>
      </div>

      <div className="content">
        <span className="date">{new Date(episode.createdAt).toLocaleDateString()}</span>
        <h3 className="title">
          <Link href={`/episodes/${episode.id}`}>{episode.title}</Link>
        </h3>
        <p className="description">{episode.description.substring(0, 100)}...</p>

        <div className="meta">
          <form action={likeEpisode.bind(null, episode.id)}>
            <button type="submit" className="like-btn">
              ♥ {episode.likes} Likes
            </button>
          </form>
          <span className="duration">Coming Soon</span>
        </div>
      </div>

      <style jsx>{`
        .card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .image-wrapper {
          position: relative;
          height: 200px;
          background: #000;
        }
        .cover-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
          transition: opacity 0.3s;
        }
        .card:hover .cover-image {
          opacity: 0.4;
        }
        .play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .card:hover .play-overlay {
          opacity: 1;
        }
        .play-icon {
          font-size: 3rem;
          color: var(--primary-yellow);
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        .content {
          padding: 1.5rem;
        }
        .date {
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .title {
          margin: 0.5rem 0;
          font-size: 1.25rem;
          line-height: 1.3;
        }
        .title a:hover {
          color: var(--primary-yellow);
        }
        .description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1rem;
        }
        .meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--foreground);
          border-top: 1px solid var(--border);
          padding-top: 1rem;
        }
        .like-btn {
          background: transparent;
          color: var(--foreground);
          font-weight: 500;
          cursor: pointer;
          padding: 0;
          border: none;
          font-family: inherit;
        }
        .like-btn:hover {
          color: var(--primary-yellow);
        }
      `}</style>
    </div>
  );
}
