import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db';

const router = Router();
const jwtSecret = process.env.JWT_SECRET ?? 'changeme';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role = 'admin' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios' });
    }

    const [existing] = await pool.query('SELECT user_id FROM users WHERE email = ?', [email]);
    if ((existing as any[]).length > 0) {
      return res.status(409).json({ message: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role],
    );

    const insertId = (result as any).insertId;
    return res.status(201).json({ user_id: insertId, name, email, role });
  } catch (err) {
    console.error('Register error', err);
    return res.status(500).json({ message: 'Erro ao criar usuário', error: String(err) });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    const [rows] = await pool.query('SELECT user_id, name, email, password, role FROM users WHERE email = ?', [email]);
    const user = (rows as any[])[0];

    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: '8h' },
    );

    return res.json({ token, user: { user_id: user.user_id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ message: 'Erro ao realizar login', error: String(err) });
  }
});

export default router;
