import styles from '../admin.module.css';
import { createEpisode } from '@/app/actions';

export default function CreateEpisodePage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title} style={{ marginBottom: '2rem', textAlign: 'center' }}>
                New Episode
            </h1>

            <form action={createEpisode} className={styles.form} encType="multipart/form-data">
                <div className={styles.formGroup}>
                    <label className={styles.label}>Episode Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="e.g. S1 E4: The Art of Letting Go"
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Description</label>
                    <textarea
                        name="description"
                        required
                        placeholder="What's this episode about?"
                        className={styles.textarea}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Flyer / Cover Image</label>
                    <input
                        type="file"
                        name="coverImage"
                        accept="image/*"
                        className={styles.fileInput}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Audio File (.mp3)</label>
                    <input
                        type="file"
                        name="audioFile"
                        accept="audio/mpeg,audio/mp3"
                        className={styles.fileInput}
                        required
                    />
                </div>

                <button type="submit" className={styles.submitBtn}>
                    Publish Episode
                </button>
            </form>
        </div>
    );
}
