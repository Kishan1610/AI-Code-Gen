import express from 'express';
const app = express();

app.post('/fetch-docs', (req, res) => {
  // Fetch and process documents here
  res.json({ docs: 'Sample document content' });
});

app.listen(3000, () => {
  console.log('Backend server running on port 3000');
});