import { Router } from 'express';
import pool from '../db';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

router.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM tags ORDER BY created_at DESC');
  return res.json(rows);
});

router.get('/:tagId', async (req, res) => {
  const { tagId } = req.params;
  const [rows] = await pool.query('SELECT * FROM tags WHERE tag_id = ?', [tagId]);
  const tag = (rows as any[])[0];
  if (!tag) return res.status(404).json({ message: 'Tag não encontrada' });
  return res.json(tag);
});

router.post('/', async (req, res) => {
  const { code, description, category, quantity_stock = 0 } = req.body;
  if (!code) return res.status(400).json({ message: 'Código da tag é obrigatório' });

  const [existing] = await pool.query('SELECT tag_id FROM tags WHERE code = ?', [code]);
  if ((existing as any[]).length > 0) {
    return res.status(409).json({ message: 'Código de tag já cadastrado' });
  }

  const [result] = await pool.query(
    'INSERT INTO tags (code, description, category, quantity_stock) VALUES (?, ?, ?, ?)',
    [code, description, category, quantity_stock],
  );

  return res.status(201).json({ tag_id: (result as any).insertId, code, description, category, quantity_stock });
});

router.put('/:tagId', async (req, res) => {
  const { tagId } = req.params;
  const { code, description, category, quantity_stock } = req.body;
  await pool.query(
    'UPDATE tags SET code = ?, description = ?, category = ?, quantity_stock = ? WHERE tag_id = ?',
    [code, description, category, quantity_stock, tagId],
  );
  return res.json({ message: 'Tag atualizada' });
});

router.delete('/:tagId', async (req, res) => {
  const { tagId } = req.params;
  await pool.query('DELETE FROM tags WHERE tag_id = ?', [tagId]);
  return res.json({ message: 'Tag removida' });
});

export default router;
