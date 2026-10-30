CREATE TABLE property (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  operation_type VARCHAR(20) NOT NULL,
  property_type VARCHAR(30) NOT NULL,
  price NUMERIC(15,2) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  province VARCHAR(80),
  city VARCHAR(80),
  neighborhood VARCHAR(80),
  address VARCHAR(200),
  bedrooms INT,
  bathrooms INT,
  rooms INT,
  covered_area NUMERIC(10,2),
  total_area NUMERIC(10,2),
  parking_spaces INT,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE property_image (
  id BIGSERIAL PRIMARY KEY,
  property_id BIGINT NOT NULL REFERENCES property(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  display_order INT NOT NULL DEFAULT 0
);
CREATE INDEX idx_property_city ON property(city);
CREATE INDEX idx_property_operation ON property(operation_type);
CREATE TABLE admin_user (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(200) NOT NULL,
  role VARCHAR(30) NOT NULL DEFAULT 'ADMIN',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE inquiry (
  id BIGSERIAL PRIMARY KEY,
  property_id BIGINT REFERENCES property(id) ON DELETE SET NULL,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(40),
  message TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
