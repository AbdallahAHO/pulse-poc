const express = require('express');
const { Octokit } = require('@octokit/rest');

// Create a new Octokit client
const octokit = new Octokit();

// Create a new Express router
const router = express.Router();

// GET /issues/:owner/:repo
// Returns the issues for a GitHub repository
router.get('/issues/:owner/:repo', async (req, res) => {
  const { owner, repo } = req.params;

  try {
    // Retrieve the issues for the repo
    const response = await octokit.issues.listForRepo({
      owner,
      repo,
    });

    // Process the issues from the response
    const issues = response.data;

    // Process and send the issues in the response
    const processedIssues = issues.map((issue) => {
      const processedIssue = {
        id: issue.id,
        title: issue.title,
        body: issue.body,
        updatedAt: issue.updated_at,
        createdAt: issue.created_at,
        state: issue.state,
        user: {
          id: issue.user.name,
          login: issue.user.login,
          avatarUrl: issue.user.avatar_url,
        },
        labels: issue.labels.map((label) => ({
          id: label.id,
          name: label.name,
          color: label.color,
        })),
        // Add any additional fields you want to include
        commentsCount: issue.comments,
      };

      // Additional fields
      processedIssue.commentsCount = issue.comments;
      processedIssue.reactions = {
        thumbsUp: issue.reactions['+1'],
        thumbsDown: issue.reactions['-1'],
        smiley: issue.reactions.laugh,
        heart: issue.reactions.heart,
        rocket: issue.reactions.rocket,
      };

      // Add the comment count to the issue body
      processedIssue.body += `\n\nComments: ${issue.comments}`;

      return processedIssue;
    });

    res.json(processedIssues);
  } catch (error) {
    // Handle any errors that occur during API request
    console.error('Error retrieving GitHub issues:', error);
    res.status(500).json({ error: 'Failed to retrieve GitHub issues' });
  }
});

module.exports = router;
