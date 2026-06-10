DROP DATABASE IF EXISTS db_contagem;
CREATE DATABASE db_contagem;
USE db_contagem;

CREATE TABLE lotes (
    lote_id INT AUTO_INCREMENT PRIMARY KEY,
    nome_lote VARCHAR(50) DEFAULT 'Lote de Teste',
    total_etiquetas_lidas INT DEFAULT 0
);

CREATE TABLE historico_leituras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lote_id INT,
    tag_code_extraido VARCHAR(100),
    data_leitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insere o primeiro lote de teste
INSERT INTO lotes (nome_lote, total_etiquetas_lidas) VALUES ('Lote Piloto ESP32', 0);
