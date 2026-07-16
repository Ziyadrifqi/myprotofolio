CREATE DATABASE IF NOT EXISTS portfolio_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- Single row table holding the hero/about/contact info
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  tagline TEXT NOT NULL,
  summary TEXT NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  github VARCHAR(255),
  linkedin VARCHAR(255),
  cv_url VARCHAR(500),
  available_for_work BOOLEAN DEFAULT TRUE,
  photo VARCHAR(255) DEFAULT '/images/foto.png',
  web3forms_access_key VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS stack_groups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  group_name VARCHAR(100) NOT NULL,
  proficiency INT NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  tools JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  project_key VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tech JSON NOT NULL,
  image VARCHAR(255),
  href VARCHAR(500),
  repo VARCHAR(500),
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience (
  id INT PRIMARY KEY AUTO_INCREMENT,
  exp_key VARCHAR(100) NOT NULL UNIQUE,
  role VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  period VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  highlights JSON NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS nav_links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  label VARCHAR(100) NOT NULL,
  href VARCHAR(100) NOT NULL,
  tag VARCHAR(100),
  sort_order INT NOT NULL DEFAULT 0
);
