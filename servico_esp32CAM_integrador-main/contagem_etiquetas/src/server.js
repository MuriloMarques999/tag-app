require('dotenv').config();
const express = require('express');
const { Jimp } = require('jimp');
const jsQR = require('jsqr');
const http = require('http');
const https = require('https');

const app = express();
const PORT = 3000;
const BACKEND_WEBHOOK_URL = process.env.BACKEND_WEBHOOK_URL;
const BACKEND_API_KEY = process.env.BACKEND_API_KEY;

app.use(require('cors')());

function postJson(urlString, payload, headers = {}) {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(urlString);
      const client = url.protocol === 'https:' ? https : http;
      const body = JSON.stringify(payload);
      const request = client.request(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body),
            ...headers,
          },
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
        },
      );

      request.on('error', reject);
      request.write(body);
      request.end();
    } catch (error) {
      reject(error);
    }
  });
}

function sendReadingConfirmed(payload) {
  if (!BACKEND_WEBHOOK_URL) return Promise.resolve();

  const headers = {
    Authorization: BACKEND_API_KEY ? `Bearer ${BACKEND_API_KEY}` : undefined,
  };

  return postJson(BACKEND_WEBHOOK_URL, payload, headers)
    .then((result) => {
      console.log('Webhook ESP32 enviado:', result.statusCode, result.body);
    })
    .catch((error) => {
      console.error('Falha ao enviar webhook para backend:', error);
    });
}

// --- Estado volátil em RAM (reinicia ao parar o processo) ---
let contadorLote = 0;
let ultimoQrLido = '(aguardando leitura)';
let ultimaImagemBase64 = null;

app.use(express.json({ limit: '50mb' }));

function decodificarQr(base64) {
  const buffer = Buffer.from(base64, 'base64');
  return Jimp.read(buffer).then((image) => {
    const { data, width, height } = image.bitmap;
    const qr = jsQR(new Uint8ClampedArray(data), width, height);
    return { qr, image };
  });
}

// --- API para o dashboard (polling a cada 1s) ---
app.get('/api/status', (req, res) => {
  res.json({
    contador: contadorLote,
    ultimoQr: ultimoQrLido,
    imagem: ultimaImagemBase64
      ? `data:image/jpeg;base64,${ultimaImagemBase64}`
      : null
  });
});

app.post('/api/reset', (req, res) => {
  contadorLote = 0;
  ultimoQrLido = '(aguardando leitura)';
  ultimaImagemBase64 = null;
  res.json({
    success: true,
    contador: contadorLote,
    message: 'Contador do lote resetado'
  });
});

// --- Dashboard de calibração e monitoramento ---
app.get('/dashboard', (req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Monitoramento de Etiquetas - ESP32-CAM</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      margin: 0;
      padding: 24px;
      background: #1a1a2e;
      color: #eee;
      min-height: 100vh;
    }
    h1 {
      text-align: center;
      font-size: 1.75rem;
      margin: 0 0 24px;
      color: #fff;
    }
    .layout {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 24px;
      max-width: 1100px;
      margin: 0 auto;
    }
    @media (max-width: 800px) {
      .layout { grid-template-columns: 1fr; }
    }
    .feed-wrap {
      background: #16213e;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
    }
    .feed-wrap img {
      max-width: 100%;
      border-radius: 8px;
      background: #0f0f1a;
      min-height: 180px;
      object-fit: contain;
    }
    .feed-label {
      margin: 0 0 12px;
      font-size: 0.9rem;
      color: #94a3b8;
    }
    .panel {
      background: #16213e;
      border-radius: 12px;
      padding: 20px;
    }
    .panel h2 {
      margin: 0 0 16px;
      font-size: 1rem;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .counter {
      font-size: 2.5rem;
      font-weight: 700;
      color: #4ade80;
      margin-bottom: 20px;
    }
    .qr-box {
      background: #0f0f1a;
      border-radius: 8px;
      padding: 12px;
      font-family: ui-monospace, monospace;
      font-size: 0.85rem;
      word-break: break-all;
      min-height: 4rem;
      color: #e2e8f0;
    }
    .status-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4ade80;
      margin-right: 6px;
      animation: pulse 1.5s ease infinite;
    }
    @keyframes pulse {
      50% { opacity: 0.4; }
    }
    .hint {
      margin-top: 16px;
      font-size: 0.8rem;
      color: #64748b;
    }
  </style>
</head>
<body>
  <h1>Monitoramento de Etiquetas - ESP32-CAM</h1>
  <div class="layout">
    <div class="feed-wrap">
      <p class="feed-label"><span class="status-dot"></span>Última foto recebida (feed ao vivo)</p>
      <img id="feed" alt="Aguardando imagem do ESP32-CAM" />
    </div>
    <div class="panel">
      <h2>Lote atual</h2>
      <p>Contador do Lote Atual:</p>
      <div class="counter" id="contador">0</div>
      <h2>Último QR Code</h2>
      <div class="qr-box" id="ultimoQr">(aguardando leitura)</div>
      <p class="hint">Atualização automática a cada 1 segundo</p>
    </div>
  </div>
  <script>
    const feedEl = document.getElementById('feed');
    const contadorEl = document.getElementById('contador');
    const ultimoQrEl = document.getElementById('ultimoQr');

    async function atualizarPainel() {
      try {
        const res = await fetch('/api/status');
        if (!res.ok) return;
        const data = await res.json();
        contadorEl.textContent = data.contador;
        ultimoQrEl.textContent = data.ultimoQr || '(aguardando leitura)';
        if (data.imagem) {
          feedEl.src = data.imagem;
        }
      } catch (e) {
        console.warn('Falha ao atualizar painel', e);
      }
    }

    atualizarPainel();
    setInterval(atualizarPainel, 1000);
  </script>
</body>
</html>`);
});

// --- Processamento de imagem do ESP32-CAM ---
app.post('/scan-image', async (req, res) => {
  try {
    const { image } = req.body;

    if (!image || typeof image !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Campo "image" (Base64) é obrigatório'
      });
    }

    ultimaImagemBase64 = image;

    const { qr } = await decodificarQr(image);

    if (!qr || !qr.data) {
      return res.status(422).json({
        success: false,
        message: 'QR Code não detectado — ajuste o enquadramento da câmera',
        contador: contadorLote
      });
    }

    ultimoQrLido = qr.data;
    contadorLote += 1;

    const confirmationPayload = {
      success: true,
      qr_data: qr.data,
      contador_local: contadorLote,
      read_at: new Date().toISOString(),
      source: 'esp32-cam-integrador'
    };

    if (BACKEND_WEBHOOK_URL) {
      sendReadingConfirmed(confirmationPayload);
    }

    return res.json({
      success: true,
      message: 'Leitura registrada com sucesso',
      qr_data: qr.data,
      contador: contadorLote
    });
  } catch (error) {
    console.error('Erro em /scan-image:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao processar a imagem'
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor volátil rodando em http://0.0.0.0:${PORT}`);
  console.log(`Dashboard: http://localhost:${PORT}/dashboard`);
});
