import pool from './db';

export async function ensureDatabaseTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'admin',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS devices (
      device_id INT AUTO_INCREMENT PRIMARY KEY,
      device_name VARCHAR(255) NOT NULL,
      status VARCHAR(50) DEFAULT 'offline',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS tags (
      tag_id INT AUTO_INCREMENT PRIMARY KEY,
      code VARCHAR(255) NOT NULL UNIQUE,
      description VARCHAR(255),
      category VARCHAR(255),
      quantity_stock INT DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS requests (
      request_id INT AUTO_INCREMENT PRIMARY KEY,
      reference_code VARCHAR(255) NOT NULL UNIQUE,
      operator_id INT,
      status VARCHAR(50) DEFAULT 'pending',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS request_items (
      request_item_id INT AUTO_INCREMENT PRIMARY KEY,
      request_id INT,
      tag_id INT,
      quantity_requested INT DEFAULT 1
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS readings (
      reading_id INT AUTO_INCREMENT PRIMARY KEY,
      request_id INT,
      item_id INT,
      tag_id INT,
      qr_code VARCHAR(255),
      operator_id INT,
      device_id INT,
      success BOOLEAN DEFAULT true,
      divergence BOOLEAN DEFAULT false,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

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
