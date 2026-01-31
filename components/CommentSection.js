'use client';

import { useState } from 'react';

function CommentItem({ comment, onReply }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    onReply(comment.id, replyText);
    setIsReplying(false);
    setReplyText('');
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className={`author ${comment.isAdmin ? 'admin' : ''}`}>
          {comment.author} {comment.isAdmin && <span className="admin-badge">Admin</span>}
        </span>
        <span className="time">{new Date(comment.createdAt).toLocaleDateString()}</span>
      </div>

      <p className="comment-text">{comment.content}</p>

      <button className="reply-btn" onClick={() => setIsReplying(!isReplying)}>
        {isReplying ? 'Cancel' : 'Reply'}
      </button>

      {isReplying && (
        <form onSubmit={handleReplySubmit} className="reply-form">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            required
          />
          <button type="submit">Post Reply</button>
        </form>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}

      <style jsx>{`
        .comment-item {
          margin-bottom: 1.5rem;
          padding-left: 0;
        }
        .replies {
          margin-top: 1rem;
          padding-left: 1.5rem;
          border-left: 2px solid var(--border);
        }
        .comment-header {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }
        .author {
          font-weight: 700;
          font-size: 0.95rem;
        }
        .admin {
          color: var(--primary-yellow);
        }
        .admin-badge {
          background: var(--primary-yellow);
          color: #000;
          font-size: 0.7rem;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          margin-left: 0.25rem;
          text-transform: uppercase;
        }
        .time {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .comment-text {
          font-size: 0.95rem;
          line-height: 1.5;
          margin-bottom: 0.5rem;
        }
        .reply-btn {
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.8rem;
          padding: 0;
          text-decoration: underline;
        }
        .reply-btn:hover {
          color: var(--primary-yellow);
        }
        .reply-form {
          margin-top: 0.5rem;
        }
        .reply-form textarea {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          color: var(--foreground);
          padding: 0.5rem;
          border-radius: 4px;
          min-height: 60px;
          font-family: inherit;
        }
        .reply-form button {
          margin-top: 0.5rem;
          background: var(--primary-yellow);
          color: #000;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

import { postComment } from '@/app/actions';

export default function CommentSection({ comments = [], episodeId }) {
  return (
    <div className="comments-section">
      <h3 className="section-title">Discussion ({comments.length})</h3>

      <form action={postComment} className="main-form">
        <input type="hidden" name="episodeId" value={episodeId} />
        <input
          type="text"
          name="author"
          placeholder="Your Name (optional)"
          className="author-input"
        />
        <textarea
          name="content"
          placeholder="Share your thoughts on this episode..."
          required
        />
        <button type="submit">Post Comment</button>
      </form>

      <div className="comments-list">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
        {comments.length === 0 && (
          <p className="no-comments">No comments yet. Be the first to start the conversation.</p>
        )}
      </div>

      <style jsx>{`
        .comments-section {
          margin-top: 3rem;
          border-top: 1px solid var(--border);
          padding-top: 2rem;
        }
        .section-title {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .main-form {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .author-input {
          background: var(--card-bg);
          border: 1px solid var(--border);
          color: var(--foreground);
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-family: inherit;
        }
        .main-form textarea {
          width: 100%;
          background: var(--card-bg);
          border: 1px solid var(--border);
          color: var(--foreground);
          padding: 1rem;
          border-radius: 8px;
          min-height: 100px;
          font-family: inherit;
        }
        .main-form button {
          align-self: flex-start;
          background: var(--foreground);
          color: var(--background);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
        }
        .no-comments {
          color: var(--text-secondary);
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
