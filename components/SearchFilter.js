'use client';

import { useState } from 'react';
import EpisodeCard from './EpisodeCard';
import styles from '../app/episodes/page.module.css';

export default function SearchFilter({ initialEpisodes }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Relationships', 'Personal Growth', 'Intimacy', 'Society'];

    const filteredEpisodes = initialEpisodes.filter(ep => {
        const matchesSearch = ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ep.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || ep.description.includes(`#${selectedCategory}`);

        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <div className={styles.controls}>
                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="Search episodes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <span className={styles.searchIcon}>🔍</span>
                </div>

                <div className={styles.categoryRow}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.active : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.grid}>
                {filteredEpisodes.map(ep => (
                    <EpisodeCard key={ep.id} episode={ep} />
                ))}
                {filteredEpisodes.length === 0 && (
                    <div className={styles.noResults}>
                        <p>No episodes found matching your search. Try another keyword!</p>
                    </div>
                )}
            </div>

            <style jsx>{`
        /* Local overrides if needed, but mostly using module.css */
      `}</style>
        </>
    );
}
