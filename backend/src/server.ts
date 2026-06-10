import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mockRoutes from './mockRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.MOCK === 'true' || process.env.MOCK === '1') {
  console.log('MOCK mode enabled: mounting fake API routes under /api');
  app.use('/api', mockRoutes);
} else {
  const authRoutes = require('./routes/auth').default;
  const tagRoutes = require('./routes/tags').default;
  const requestRoutes = require('./routes/requests').default;
  const readingRoutes = require('./routes/readings').default;
  const deviceRoutes = require('./routes/devices').default;

  app.use('/api/auth', authRoutes);
  app.use('/api/tags', tagRoutes);
  app.use('/api/requests', requestRoutes);
  app.use('/api/readings', readingRoutes);
  app.use('/api/devices', deviceRoutes);
}

app.use(errorHandler);

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});
