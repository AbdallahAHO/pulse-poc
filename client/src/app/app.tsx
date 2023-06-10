import Card from 'components/organisms/card';
import { useEffect } from 'react';

import useGitHubIssues from '../hooks/useGitHubIssues';
import styles from './app.module.css';
import { InboxStackIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const App = () => {
  const { issues, loading } = useGitHubIssues();

  useEffect(() => {
    document.title = 'GitHub Issues Explorer';
  }, []);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>GitHub Issues Explorer</h1>
        <p className={styles.headerDescription}>
          Explore and analyze GitHub issues from public repositories. This PoC
          showcases the integration of React, TypeScript, and Tailwind CSS to
          provide a seamless browsing experience.
        </p>
      </header>
      <section className={styles.features}>
        {loading ? (
          <p className={styles.headerTopTitle}>Loading issues...</p>
        ) : (
          issues.map((issue) => (
            <div key={issue.id} className={styles.cardWrapper}>
              <Card
                Icon={issue.state === 'open' ? InboxStackIcon : LockClosedIcon}
                title={issue.title}
                description={issue.body}
                href={issue.body}
              />
            </div>
          ))
        )}
      </section>
      <footer className={styles.footer}>
        <p>Explore and analyze GitHub issues with ease.</p>
      </footer>
    </main>
  );
};

export default App;
