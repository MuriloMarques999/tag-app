import { Router } from 'express';
import pool from '../db';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  const { request_id } = req.query;
  const query = `SELECT r.*, u.name as operator_name, d.device_name FROM readings r
    LEFT JOIN users u ON u.user_id = r.operator_id
    LEFT JOIN devices d ON d.device_id = r.device_id
    ${request_id ? 'WHERE r.request_id = ?' : ''}`;
  const params = request_id ? [request_id] : [];
  const [rows] = await pool.query(query, params);
  return res.json(rows);
});

router.post('/', async (req, res) => {
  const { request_id, item_id, tag_id, qr_code, operator_id, device_id, success = true } = req.body;
  if (!request_id || !item_id || !tag_id || !qr_code || !operator_id || !device_id) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando' });
  }

  const divergence = success ? false : true;
  await pool.query(
    'INSERT INTO readings (request_id, item_id, tag_id, qr_code, operator_id, device_id, success, divergence) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [request_id, item_id, tag_id, qr_code, operator_id, device_id, success ? 1 : 0, divergence ? 1 : 0],
  );

  if (success) {
    await pool.query('UPDATE request_items SET quantity_separated = quantity_separated + 1 WHERE item_id = ?', [item_id]);
  } else {
    await pool.query('UPDATE request_items SET divergence = 1 WHERE item_id = ?', [item_id]);
  }

  return res.status(201).json({ message: 'Registro de leitura criado' });
});

export default router;
