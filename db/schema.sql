-- ==========================================================
-- SISTEMA DE ALABANZA (POSTGRESQL)
-- Esquema + datos fijos que el código asume que existen.
-- Los usuarios (incluido el admin) NO van aquí: se cargan
-- directamente en la base para no publicar hashes en el repo.
-- ==========================================================

-- 1. Roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- 2. Usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- 3. Canciones / Alabanzas
CREATE TABLE IF NOT EXISTS songs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    composer VARCHAR(100),
    musical_key VARCHAR(10),
    tempo VARCHAR(30),
    lyrics TEXT,
    chords TEXT,
    youtube_link VARCHAR(255),
    drive_track_link VARCHAR(255),
    is_new BOOLEAN NOT NULL DEFAULT TRUE,
    last_played_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- 4. Tipos de culto
CREATE TABLE IF NOT EXISTS service_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- 5. Cultos / Reuniones
CREATE TABLE IF NOT EXISTS worship_services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    service_date DATE NOT NULL,
    service_type_id INT NOT NULL REFERENCES service_types(id) ON DELETE RESTRICT,
    created_by INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- 6. Setlist: relación N:M entre cultos y canciones
CREATE TABLE IF NOT EXISTS service_songs (
    id SERIAL PRIMARY KEY,
    service_id INT NOT NULL REFERENCES worship_services(id) ON DELETE CASCADE,
    song_id INT NOT NULL REFERENCES songs(id) ON DELETE CASCADE,
    sequence_order INT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_role ON users(role_id);
CREATE INDEX IF NOT EXISTS idx_ws_date ON worship_services(service_date);
CREATE INDEX IF NOT EXISTS idx_ws_type ON worship_services(service_type_id);
CREATE INDEX IF NOT EXISTS idx_ss_service ON service_songs(service_id);
CREATE INDEX IF NOT EXISTS idx_ss_song ON service_songs(song_id);

-- ==========================================================
-- Datos fijos (IDs usados en el código: auth.service y el cron)
-- ==========================================================
INSERT INTO roles (id, name, description) VALUES
    (1, 'admin', 'Administrador con acceso total al sistema'),
    (2, 'user', 'Usuario estándar del sistema de alabanza')
ON CONFLICT (id) DO NOTHING;

INSERT INTO service_types (id, name) VALUES
    (1, 'Culto Dominical'),
    (2, 'Culto de Adoración (Jueves)'),
    (3, 'Culto Especial')
ON CONFLICT (id) DO NOTHING;

-- Al insertar IDs explícitos hay que avanzar las secuencias
SELECT setval('roles_id_seq', (SELECT MAX(id) FROM roles));
SELECT setval('service_types_id_seq', (SELECT MAX(id) FROM service_types));
