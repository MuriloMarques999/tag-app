import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();
const jwtSecret = process.env.JWT_SECRET ?? 'changeme';

router.post('/auth/register', (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) return res.status(400).json({ message: 'Nome e email obrigatórios' });
  return res.status(201).json({ user_id: Math.floor(Math.random() * 10000) + 1, name, email, role: 'admin' });
});

router.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  const token = jwt.sign({ user_id: 1, email, role: 'admin' }, jwtSecret, { expiresIn: '8h' });
  return res.json({ token, user: { user_id: 1, name: 'Mock User', email, role: 'admin' } });
});

router.get('/tags', (req, res) => {
  return res.json([
    { tag_id: 1, code: 'ETQ123', description: 'Etiqueta A', category: 'A', quantity_stock: 100 },
    { tag_id: 2, code: 'ETQ456', description: 'Etiqueta B', category: 'B', quantity_stock: 50 },
  ]);
});

router.get('/requests', (req, res) => {
  return res.json([
    { request_id: 1, reference_code: 'ETQ123', status: 'pending', operator_id: 1, total_items: 3 },
    { request_id: 2, reference_code: 'ETQ456', status: 'in_progress', operator_id: 1, total_items: 2 },
  ]);
});

router.get('/requests/:id', (req, res) => {
  const { id } = req.params;
  return res.json({ request_id: Number(id), reference_code: `ETQ${id}`, status: 'pending', items: [{ item_id: 1, tag_id: 1, quantity_requested: 2 }] });
});

router.get('/devices', (req, res) => {
  return res.json([{ device_id: 1, device_name: 'Scanner-A', status: 'available' }]);
});

router.post('/readings', (req, res) => {
  return res.status(201).json({ message: 'Leitura mock criada' });
});

export default router;
