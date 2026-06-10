import { Router } from 'express';
import pool from '../db';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  const [rows] = await pool.query(
    `SELECT r.*, u.name as operator_name, COUNT(ri.item_id) as total_items
     FROM requests r
     LEFT JOIN users u ON r.operator_id = u.user_id
     LEFT JOIN request_items ri ON ri.request_id = r.request_id
     GROUP BY r.request_id
     ORDER BY r.created_at DESC`,
  );
  return res.json(rows);
});

router.get('/:requestId', async (req, res) => {
  const { requestId } = req.params;
  const [rows] = await pool.query('SELECT * FROM requests WHERE request_id = ?', [requestId]);
  const request = (rows as any[])[0];
  if (!request) return res.status(404).json({ message: 'Requisição não encontrada' });
  const [items] = await pool.query('SELECT ri.*, t.code, t.description FROM request_items ri LEFT JOIN tags t ON ri.tag_id = t.tag_id WHERE ri.request_id = ?', [requestId]);
  return res.json({ ...request, items });
});

router.post('/', async (req, res) => {
  const { reference_code, operator_id, status = 'pending', items } = req.body;
  if (!reference_code || !operator_id || !items || !Array.isArray(items)) {
    return res.status(400).json({ message: 'reference_code, operator_id e items são obrigatórios' });
  }

  const [existing] = await pool.query('SELECT request_id FROM requests WHERE reference_code = ?', [reference_code]);
  if ((existing as any[]).length > 0) {
    return res.status(409).json({ message: 'Código de requisição já existe' });
  }

  const [result] = await pool.query('INSERT INTO requests (reference_code, operator_id, status) VALUES (?, ?, ?)', [reference_code, operator_id, status]);
  const requestId = (result as any).insertId;

  for (const item of items) {
    const { tag_id, quantity_requested } = item;
    await pool.query('INSERT INTO request_items (request_id, tag_id, quantity_requested) VALUES (?, ?, ?)', [requestId, tag_id, quantity_requested || 1]);
  }

  return res.status(201).json({ message: 'Requisição criada', request_id: requestId });
});

router.post('/:requestId/items', async (req, res) => {
  const { requestId } = req.params;
  const { tag_id, quantity_requested = 1 } = req.body;
  if (!tag_id) return res.status(400).json({ message: 'tag_id é obrigatório' });
  await pool.query('INSERT INTO request_items (request_id, tag_id, quantity_requested) VALUES (?, ?, ?)', [requestId, tag_id, quantity_requested]);
  return res.status(201).json({ message: 'Item adicionado' });
});

router.patch('/:requestId/status', async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;
  if (!status) return res.status(400).json({ message: 'Status é obrigatório' });
  await pool.query('UPDATE requests SET status = ? WHERE request_id = ?', [status, requestId]);
  return res.json({ message: 'Status da requisição atualizado' });
});

router.get('/:requestId/items', async (req, res) => {
  const { requestId } = req.params;
  const [rows] = await pool.query('SELECT ri.*, t.code, t.description FROM request_items ri LEFT JOIN tags t ON ri.tag_id = t.tag_id WHERE ri.request_id = ?', [requestId]);
  return res.json(rows);
});

export default router;
