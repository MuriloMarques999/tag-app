const mysql = require('mysql2/promise');

async function teste() {
  try {
    console.log('Tentando conectar...');
    const conn = await mysql.createConnection({
      host: '54.156.234.60',
      port: 3306,
      user: 'app_contagem',
      password: 'Contagem@2026',
      database: 'db_contagem',
      connectTimeout: 10000 // 10 seconds timeout
    });

    console.log('Conectado com sucesso!');

    const [rows] = await conn.query('SELECT NOW() AS agora');
    console.log('Resposta do banco:', rows);

    await conn.end();
  } catch (err) {
    console.error('Erro ao conectar:');
    console.error(err);
  }
}

teste();
