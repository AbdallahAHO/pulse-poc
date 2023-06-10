import { useEffect, useState } from 'react';

interface Issue {
  id: number;
  title: string;
  body: string;
  updatedAt: string;
  createdAt: string;
  state: string;
  user: {
    login: string;
    avatarUrl: string;
  };
  labels: string[];
  commentsCount: number;
  reactions: {
    thumbsUp: number;
    thumbsDown: number;
    smiley: number;
    heart: number;
    rocket: number;
  };
}

const useGitHubIssues = (): { issues: Issue[]; loading: boolean } => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async (): Promise<void> => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/issues/postmanlabs/postman-app-support`
        );
        const data = await response.json();
        setIssues(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub issues:', error);
      }
    };

    fetchIssues();
  }, []);

  return { issues, loading };
};

export default useGitHubIssues;
