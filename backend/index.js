// backend/index.js
// Simple Express server exposing API routes for Olympius features.
// This is a minimal implementation using in‑memory stores for demo purposes.

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Olympius backend listening on http://localhost:${PORT}`);
});
