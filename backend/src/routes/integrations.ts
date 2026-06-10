import { Request, Response, Router } from 'express';
import pool from '../db';

const router = Router();
const apiKey = process.env.ESP32_INTEGRATION_API_KEY ?? 'changeme';
const duplicateWindowSec = Number(process.env.ESP32_DUPLICATE_WINDOW_SEC ?? 3);

function getServiceApiKey(req: Request) {
  const authHeader = req.headers['x-api-key'] || req.headers.authorization;
  if (!authHeader || typeof authHeader !== 'string') return null;
  return authHeader.startsWith('Bearer ') ? authHeader.replace(/^Bearer\s+/, '').trim() : authHeader.trim();
}

function extractTagCode(qrData: unknown) {
  if (!qrData) return '';
  if (typeof qrData === 'string') {
    try {
      const parsed = JSON.parse(qrData);
      return (parsed?.tag_code || parsed?.code || parsed?.tagCode || qrData).toString();
    } catch {
      return qrData;
    }
  }
  try {
    const parsedJson = typeof qrData === 'object' ? qrData : JSON.parse(JSON.stringify(qrData));
    return (parsedJson?.tag_code || parsedJson?.code || parsedJson?.tagCode || JSON.stringify(parsedJson)).toString();
  } catch {
    return '';
  }
}

router.post('/esp32/reading-confirmed', async (req: Request, res: Response) => {
  const requestApiKey = getServiceApiKey(req);
  if (!requestApiKey || requestApiKey !== apiKey) {
    return res.status(401).json({ message: 'API key inválida' });
  }

  const { success, qr_data, contador_local, read_at, source, request_id, operator_id, device_id } = req.body;

  if (success !== true) {
    return res.status(400).json({ message: 'success must be true' });
  }

  const tagCode = extractTagCode(qr_data);
  if (!tagCode || !tagCode.toString().trim()) {
    return res.status(400).json({ message: 'qr_data inválido ou não contém tag_code' });
  }

  const [duplicates] = await pool.query(
    `SELECT id FROM esp32_readings WHERE tag_code = ? AND (request_id <=> ?) AND read_at >= NOW() - INTERVAL ? SECOND LIMIT 1`,
    [tagCode, request_id ?? null, duplicateWindowSec],
  );

  if (Array.isArray(duplicates) && duplicates.length > 0) {
    return res.json({ accepted: true, duplicate: true, tag_code: tagCode });
  }

  await pool.query(
    `INSERT INTO esp32_readings (qr_data, tag_code, request_id, operator_id, device_id, contador_local, source, read_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      typeof qr_data === 'string' ? qr_data : JSON.stringify(qr_data),
      tagCode,
      request_id ?? null,
      operator_id ?? null,
      device_id ?? null,
      contador_local ?? null,
      source ?? 'esp32-cam-integrador',
      read_at ? new Date(read_at) : new Date(),
    ],
  );

  return res.json({ accepted: true, duplicate: false, tag_code: tagCode });
});

export default router;
