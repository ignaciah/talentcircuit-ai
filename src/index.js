const http = require('http');
const fs = require('fs');
const path = require('path');

const DEFAULT_PORT = 4000;
const ENV_PATH = path.join(process.cwd(), '.env');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value.replace(/^['"]|['"]$/g, '');
    }
  }
}

loadEnvFile(ENV_PATH);

const port = Number(process.env.PORT || DEFAULT_PORT);
const qwenApiBase = process.env.QWEN_API_BASE || process.env.QWENAPIBASE || 'https://api.qwencloud.com/v1';
const qwenApiKey = process.env.QWEN_API_KEY || process.env.QWENAPIKEY || '';
const qwenModel = process.env.QWEN_MODEL || 'qwen-max';

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Request body too large'));
      }
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');

  if (req.method === 'GET' && url.pathname === '/health') {
    sendJson(res, 200, {
      status: 'ok',
      service: 'talentcircuit-ai',
      qwenConfigured: Boolean(qwenApiKey),
      qwenModel,
      qwenApiBase,
    });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/') {
    sendJson(res, 200, {
      message: 'Talent Circuit AI is running',
      endpoints: ['/health', '/api/chat'],
    });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/chat') {
    try {
      const body = await parseJsonBody(req);
      if (!qwenApiKey) {
        sendJson(res, 503, {
          error: 'QWEN_API_KEY is not configured',
        });
        return;
      }

      const response = await fetch(`${qwenApiBase}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${qwenApiKey}`,
        },
        body: JSON.stringify({
          model: body.model || qwenModel,
          messages: body.messages || [{ role: 'user', content: body.prompt || 'Hello from Talent Circuit AI' }],
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        sendJson(res, response.status, {
          error: data.error || 'Qwen request failed',
        });
        return;
      }

      const content = data.choices?.[0]?.message?.content || '';
      sendJson(res, 200, {
        content,
        provider: 'qwen',
      });
    } catch (error) {
      sendJson(res, 500, {
        error: error.message || 'Unexpected error',
      });
    }
    return;
  }

  sendJson(res, 404, {
    error: 'Not found',
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Talent Circuit AI listening on port ${port}`);
  console.log(`Health check: http://127.0.0.1:${port}/health`);
});
