import { Router } from 'express';
import pool from '../db';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM devices ORDER BY created_at DESC');
  return res.json(rows);
});

router.post('/', async (req, res) => {
  const { device_name, status = 'available' } = req.body;
  if (!device_name) return res.status(400).json({ message: 'Nome do dispositivo é obrigatório' });
  const [result] = await pool.query('INSERT INTO devices (device_name, status) VALUES (?, ?)', [device_name, status]);
  return res.status(201).json({ device_id: (result as any).insertId, device_name, status });
});

export default router;
