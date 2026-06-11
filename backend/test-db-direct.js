const mysql = require('mysql2/promise');
const test = async () => {
  try {
    const connection = await mysql.createConnection({
      host: '54.156.234.60',
      port: 3306,
      user: 'app_contagem',
      password: 'Contagem@2026',
      database: 'db_contagem'
    });
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('Connection successful!', rows);
    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:', err);
    process.exit(1);
  }
};
test();
