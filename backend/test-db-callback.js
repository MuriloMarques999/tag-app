const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: '54.156.234.60',
  port: 3306,
  user: 'app_contagem',
  password: 'Contagem@2026',
  database: 'db_contagem',
  connectTimeout: 10000
});

connection.connect((err) => {
  if (err) {
    console.error('Connection error:', err);
    process.exit(1);
  }
  console.log('Connected!');
  connection.end();
});
