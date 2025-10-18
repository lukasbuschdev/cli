const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');
const path = require('path');

// Note: This backend script runs on my VPS and uses a Python virtual environment
// The `.venv/bin/python` path must be adjusted if running locally
const PYTHON = path.join(__dirname, '.venv/bin/python');
const HISTORY_SCRIPT = path.join(__dirname, 'history.py'); // backend script

const app = express();
app.use(cors());
app.use(bodyParser.json());

function runHistory(sub, args = []) {
  return new Promise((resolve, reject) => {
    const python = spawn(PYTHON, [HISTORY_SCRIPT, sub, ...args], {
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let out = '', err = '';
    python.stdout.on('data', data => (out += data.toString()));
    python.stderr.on('data', data => (err += data.toString()));

    python.on('close', code => {
      try {
        const json = JSON.parse(out || '{}');
        resolve(json);
      } catch (e) {
        reject(err || e);
      }
    });
  });
}

// POST /history - { cmd: "..." }
app.post('/history', async (req, res) => {
  const cmd = String(req.body?.cmd || '').trim();

  if (!cmd) return res.status(400).json({ error: 'empty command' });

  try {
    const data = await runHistory('insert', ['--cmd', cmd]);
    res.set('Access-Control-Allow-Origin', '*');
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }
});

// GET /history?limit=10000
app.get('/history', async (req, res) => {
  const limit = String(req.query.limit || '10000');

  try {
    const data = await runHistory('list', ['--limit', limit]);
    res.set('Access-Control-Allow-Origin', '*');
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ error: e.toString() });
  }
});
