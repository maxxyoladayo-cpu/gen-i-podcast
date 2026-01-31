import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import NewsletterForm from '@/components/NewsletterForm';

export const metadata = {
  title: "GEN-I Podcast | Intimacy with God",
  description: "Fostering deep, authentic intimacy with God through unfiltered conversations on faith and spiritual growth.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          <main className="main-content">
            {children}
          </main>
          <footer className="footer">
            <div className="footer-content">
              <NewsletterForm />
              <div className="footer-social">
                <a href="https://www.instagram.com/generation_intimacy?igsh=eDd2OWQ5aGFwa3V5" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ verticalAlign: 'middle', marginRight: '8px' }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  Instagram: @generation_intimacy
                </a>
                <a href="https://open.spotify.com/show/4PYocWNzgDh7t482uS6nx1?si=9tgdEwnMSP-5n7ZOsVPYPg" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" width="18" height="18" style={{ verticalAlign: 'middle', marginRight: '8px', color: '#1DB954' }} fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.591 17.318c-.196.3-.59.385-.89.189-2.316-1.417-5.232-1.737-8.667-.954-.342.078-.679-.136-.757-.478-.078-.341.137-.678.478-.756 3.748-.857 6.969-.485 9.55 1.099.298.181-.396.574-.189.8zm1.485-3.267c-.247.4-.768.528-1.168.281-2.651-1.63-6.691-2.102-9.824-1.151-.45.137-.919-.118-1.056-.568-.137-.45.118-.919.568-1.056 3.578-1.085 8.046-.554 11.099 1.321.4.246.528.767.281 1.173zm.126-3.414c-3.178-1.887-8.423-2.063-11.458-1.141-.488.148-1.002-.132-1.15-.62-.148-.488.132-1.002.62-1.15 3.5-1.06 9.303-.854 13.01 1.348.439.261.583.829.322 1.268-.261.439-.829.583-1.268.322l-.026-.013z" /></svg>
                  Spotify: Generation Intimacy (GEN I)
                </a>
                <a href="mailto:generationintimacy@gmail.com">
                  <svg viewBox="0 0 24 24" width="18" height="18" style={{ verticalAlign: 'middle', marginRight: '8px', color: '#FFD700' }} fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
                  Email: generationintimacy@gmail.com
                </a>
              </div>
              <p>&copy; {new Date().getFullYear()} GEN-I Podcast. All rights reserved.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
