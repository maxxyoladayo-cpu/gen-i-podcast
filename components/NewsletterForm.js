'use client';

import { useState } from 'react';
import { subscribeNewsletter } from '@/app/actions';

export default function NewsletterForm() {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData) {
        setLoading(true);
        setStatus(null);
        const result = await subscribeNewsletter(formData);
        setLoading(false);
        if (result.success) {
            setStatus({ type: 'success', message: 'Thank you for subscribing!' });
        } else {
            setStatus({ type: 'error', message: result.error });
        }
    }

    return (
        <div className="newsletter-box">
            <h4>Join the Conversation</h4>
            <p>Get notified when we drop new episodes.</p>

            <form action={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="email-input"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Joining...' : 'Subscribe'}
                </button>
            </form>

            {status && (
                <p className={`status-msg ${status.type}`}>
                    {status.message}
                </p>
            )}

            <style jsx>{`
                .newsletter-box {
                    background: var(--card-bg);
                    padding: 2rem;
                    border-radius: 16px;
                    border: 1px solid var(--border);
                    max-width: 400px;
                    margin: 2rem auto;
                }
                h4 {
                    margin-bottom: 0.5rem;
                    font-size: 1.2rem;
                    color: var(--primary-yellow);
                }
                p {
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    margin-bottom: 1.5rem;
                }
                form {
                    display: flex;
                    gap: 0.5rem;
                }
                .email-input {
                    flex: 1;
                    padding: 0.75rem 1rem;
                    border-radius: 50px;
                    border: 1px solid var(--border);
                    background: var(--background);
                    color: var(--foreground);
                }
                button {
                    background: var(--foreground);
                    color: var(--background);
                    padding: 0.75rem 1.5rem;
                    border-radius: 50px;
                    font-weight: 600;
                }
                .status-msg {
                    margin-top: 1rem;
                    font-size: 0.85rem;
                }
                .status-msg.success { color: #4CAF50; }
                .status-msg.error { color: #f44336; }
            `}</style>
        </div>
    );
}
