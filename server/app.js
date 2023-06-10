const express = require('express');
const cors = require('cors');

const issuesRouter = require('./routes/issues');

const app = express();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api', issuesRouter);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
