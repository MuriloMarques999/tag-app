import pool from './db';

export async function ensureEsp32IntegrationTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS esp32_readings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      qr_data TEXT NOT NULL,
      tag_code VARCHAR(255) NOT NULL,
      request_id INT NULL,
      operator_id INT NULL,
      device_id INT NULL,
      contador_local INT NULL,
      source VARCHAR(100) DEFAULT 'esp32-cam-integrador',
      read_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
