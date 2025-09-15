-- Création des tables (si besoin)
CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  birth_date DATE,
  address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS document (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  type VARCHAR(100),
  file_url VARCHAR(255),
  uploaded_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservation (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  password_hash VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  birth_date DATE,
  address VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS agency (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  city VARCHAR(100),
  country VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS vehicle (
  id SERIAL PRIMARY KEY,
  acriss_code VARCHAR(20),
  brand VARCHAR(100),
  model VARCHAR(100),
  category VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS rental_offer (
  id SERIAL PRIMARY KEY,
  agency_id INTEGER NOT NULL REFERENCES agency(id) ON DELETE CASCADE,
  vehicle_id INTEGER NOT NULL REFERENCES vehicle(id) ON DELETE CASCADE,
  start_datetime TIMESTAMP,
  end_datetime TIMESTAMP,
  price DECIMAL
);

CREATE TABLE IF NOT EXISTS payment (
  id SERIAL PRIMARY KEY,
  reservation_id INTEGER NOT NULL REFERENCES reservation(id) ON DELETE CASCADE,
  amount DECIMAL,
  status VARCHAR(50),
  provider VARCHAR(100),
  external_reference VARCHAR(255)
);

-- Insertion de données de test
INSERT INTO "user" (email, password_hash, first_name, last_name, birth_date, address) VALUES
  ('client1@email.com', 'hash1', 'Alice', 'Martin', '1990-01-01', '1 rue de Paris'),
  ('client2@email.com', 'hash2', 'Bob', 'Durand', '1985-05-10', '2 avenue de Lyon'),
  ('client3@email.com', 'hash3', 'Charlie', 'Dupont', '1992-03-15', '3 boulevard de Marseille'),
  ('support@email.com', 'hash4', 'David', 'Martin', '1988-07-22', '4 rue de Nice');


CREATE TABLE IF NOT EXISTS chat_thread (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat_message (
  id SERIAL PRIMARY KEY,
  thread_id INTEGER NOT NULL REFERENCES chat_thread(id) ON DELETE CASCADE,
  sender_type VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  sent_at TIMESTAMP
);