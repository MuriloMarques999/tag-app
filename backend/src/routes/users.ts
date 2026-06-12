import { Router } from 'express';
import pool from '../db';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

router.get('/operators', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT user_id, name, email FROM users WHERE role = ?', ['operator']);
    return res.json(rows);
  } catch (err) {
    console.error('Error fetching operators', err);
    return res.status(500).json({ message: 'Erro ao buscar operadores', error: String(err) });
  }
});

export default router;