import styles from '../admin.module.css';
import { loginAdmin } from '@/app/actions';

export default function LoginPage({ searchParams }) {
    const error = searchParams?.error;

    return (
        <div className={styles.container}>
            <div className={styles.form} style={{ marginTop: '4rem' }}>
                <h1 className={styles.title} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    Admin Login
                </h1>

                {error && (
                    <p style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        Invalid password. Please try again.
                    </p>
                )}

                <form action={loginAdmin}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className={styles.input}
                            placeholder="Enter admin password"
                            autoFocus
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}
