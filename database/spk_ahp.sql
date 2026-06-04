CREATE DATABASE spk_ahp_pesantren;
USE spk_ahp_pesantren;

CREATE TABLE admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  password TEXT
);

CREATE TABLE kriteria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255)
);

CREATE TABLE perbandingan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kriteria1 INT,
  kriteria2 INT,
  nilai DOUBLE
);

CREATE TABLE hasil_bobot (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kriteria_id INT,
  bobot DOUBLE
);

INSERT INTO admin(username,password)
VALUES(
'admin',
'$2a$10$7EqJtq98hPqEX7fNZaFWoOHiW4nK8m8K4D4ew3Efr2E1VlzDqgW8i'
);

INSERT INTO kriteria(nama)
VALUES
('SPP bulan pertama'),
('Uang pangkal'),
('Formulir dan registrasi'),
('Seragam'),
('Buku paket/kitab'),
('Administrasi semester awal'),
('Biaya ekstrakurikuler awal');