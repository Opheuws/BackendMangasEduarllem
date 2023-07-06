CREATE DATABASE db_manga;


-- Criação da tabela "mangas"
CREATE TABLE mangas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255),
  autor VARCHAR(255),
  genero VARCHAR(255),
  paginas INT
);

-- Criação da tabela "capitulo"
CREATE TABLE capitulo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  capitulo INT,
  titulo_anime VARCHAR(255),
  paginas INT,
  manga_id INT,
  FOREIGN KEY (manga_id) REFERENCES mangas(id)
);
