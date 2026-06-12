import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mockRoutes from './mockRoutes';
import { errorHandler } from './middleware/errorHandler';
import { ensureDatabaseTables } from './initDb';

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
  const integrationsRoutes = require('./routes/integrations').default;
  const usersRoutes = require('./routes/users').default;

  app.use('/api/auth', authRoutes);
  app.use('/api/tags', tagRoutes);
  app.use('/api/requests', requestRoutes);
  app.use('/api/readings', readingRoutes);
  app.use('/api/devices', deviceRoutes);
  app.use('/api/integrations', integrationsRoutes);
  app.use('/api/users', usersRoutes);
}

app.use(errorHandler);

const port = Number(process.env.PORT ?? 4000);

async function start() {
  if (!(process.env.MOCK === 'true' || process.env.MOCK === '1')) {
    try {
      await ensureDatabaseTables();
      console.log('Tabelas do banco de dados verificadas/criadas com sucesso.');
    } catch (dbError) {
      console.error('Erro ao criar tabelas do banco de dados:', dbError);
    }
  }

  app.listen(port, () => {
    console.log(`Backend rodando em http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error('Erro ao iniciar o backend:', error);
  process.exit(1);
});
