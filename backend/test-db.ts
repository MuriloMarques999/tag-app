import db from './src/db';
const test = async () => {
  try {
    const [rows] = await db.query('SELECT 1 as test');
    console.log('Connection successful!');
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:', err);
    process.exit(1);
  }
};
test();
