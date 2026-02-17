-- ============================================================
-- Abipesca - Unified Database Migration Script
-- Creates all tables for NAuth, NNews and Bazzuca schemas
-- ============================================================

-- ============================================================
-- NAuth Tables
-- ============================================================

CREATE SEQUENCE IF NOT EXISTS role_id_seq;
CREATE SEQUENCE IF NOT EXISTS user_id_seq;
CREATE SEQUENCE IF NOT EXISTS user_addresses_id_seq;
CREATE SEQUENCE IF NOT EXISTS user_documents_id_seq;
CREATE SEQUENCE IF NOT EXISTS user_phones_id_seq;

CREATE TABLE IF NOT EXISTS roles (
    role_id BIGINT NOT NULL DEFAULT nextval('role_id_seq'),
    slug VARCHAR(80) NOT NULL,
    name VARCHAR(80) NOT NULL,
    CONSTRAINT roles_pkey PRIMARY KEY (role_id)
);

CREATE TABLE IF NOT EXISTS users (
    user_id BIGINT NOT NULL DEFAULT nextval('user_id_seq'),
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    hash VARCHAR(128),
    slug VARCHAR(140) NOT NULL,
    email VARCHAR(180) NOT NULL,
    name VARCHAR(120) NOT NULL,
    password VARCHAR(255),
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    recovery_hash VARCHAR(128),
    id_document VARCHAR(30),
    birth_date TIMESTAMP WITHOUT TIME ZONE,
    pix_key VARCHAR(180),
    stripe_id VARCHAR(120),
    image VARCHAR(150),
    status INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id),
    CONSTRAINT fk_user_role_user FOREIGN KEY (user_id) REFERENCES users (user_id),
    CONSTRAINT fk_user_role_role FOREIGN KEY (role_id) REFERENCES roles (role_id)
);

CREATE TABLE IF NOT EXISTS user_addresses (
    address_id BIGINT NOT NULL DEFAULT nextval('user_addresses_id_seq'),
    user_id BIGINT NOT NULL,
    zip_code VARCHAR(15),
    address VARCHAR(150),
    complement VARCHAR(150),
    neighborhood VARCHAR(120),
    city VARCHAR(120),
    state VARCHAR(80),
    CONSTRAINT pk_user_addresses PRIMARY KEY (address_id),
    CONSTRAINT fk_user_address FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS user_documents (
    document_id BIGINT NOT NULL DEFAULT nextval('user_documents_id_seq'),
    user_id BIGINT,
    document_type INTEGER NOT NULL DEFAULT 0,
    base64 TEXT,
    CONSTRAINT user_documents_pkey PRIMARY KEY (document_id),
    CONSTRAINT fk_user_document FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS user_phones (
    phone_id BIGINT NOT NULL DEFAULT nextval('user_phones_id_seq'),
    user_id BIGINT NOT NULL,
    phone VARCHAR(30) NOT NULL,
    CONSTRAINT user_phones_pkey PRIMARY KEY (phone_id),
    CONSTRAINT fk_user_phone FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- ============================================================
-- NNews Tables
-- ============================================================

CREATE SEQUENCE IF NOT EXISTS article_id_seq;
CREATE SEQUENCE IF NOT EXISTS category_id_seq;
CREATE SEQUENCE IF NOT EXISTS tag_id_seq;

CREATE TABLE IF NOT EXISTS categories (
    category_id BIGINT NOT NULL DEFAULT nextval('category_id_seq'),
    parent_id BIGINT,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    title VARCHAR(240) NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY (category_id),
    CONSTRAINT fk_category_parent FOREIGN KEY (parent_id) REFERENCES categories (category_id)
);

CREATE TABLE IF NOT EXISTS tags (
    tag_id BIGINT NOT NULL DEFAULT nextval('tag_id_seq'),
    slug VARCHAR(120) NOT NULL,
    title VARCHAR(120) NOT NULL,
    CONSTRAINT tags_pkey PRIMARY KEY (tag_id)
);

CREATE TABLE IF NOT EXISTS articles (
    article_id BIGINT NOT NULL DEFAULT nextval('article_id_seq'),
    category_id BIGINT NOT NULL,
    author_id BIGINT,
    date_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    image_name VARCHAR(560),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT articles_pkey PRIMARY KEY (article_id),
    CONSTRAINT fk_article_category FOREIGN KEY (category_id) REFERENCES categories (category_id)
);

CREATE TABLE IF NOT EXISTS article_tags (
    article_id BIGINT NOT NULL,
    tag_id BIGINT NOT NULL,
    CONSTRAINT article_tags_pkey PRIMARY KEY (article_id, tag_id),
    CONSTRAINT fk_article_tag_article FOREIGN KEY (article_id) REFERENCES articles (article_id),
    CONSTRAINT fk_article_tag_tag FOREIGN KEY (tag_id) REFERENCES tags (tag_id)
);

CREATE TABLE IF NOT EXISTS article_roles (
    article_id BIGINT NOT NULL,
    slug VARCHAR(80) NOT NULL,
    name VARCHAR(80),
    CONSTRAINT article_roles_pkey PRIMARY KEY (article_id, slug),
    CONSTRAINT fk_article_role_article FOREIGN KEY (article_id) REFERENCES articles (article_id)
);

-- ============================================================
-- Bazzuca Tables
-- ============================================================

CREATE TABLE IF NOT EXISTS clients (
    client_id BIGSERIAL,
    user_id BIGINT NOT NULL,
    name VARCHAR(80) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT clients_pkey PRIMARY KEY (client_id)
);

CREATE TABLE IF NOT EXISTS social_networks (
    network_id BIGSERIAL,
    client_id BIGINT NOT NULL,
    network_key INTEGER NOT NULL,
    url VARCHAR(180) NOT NULL,
    "user" VARCHAR(255),
    password VARCHAR(255),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    access_token VARCHAR(255),
    access_secret VARCHAR(255),
    CONSTRAINT social_networks_pkey PRIMARY KEY (network_id),
    CONSTRAINT fk_client_social_network FOREIGN KEY (client_id) REFERENCES clients (client_id)
);

CREATE TABLE IF NOT EXISTS posts (
    post_id BIGSERIAL,
    network_id BIGINT NOT NULL,
    client_id BIGINT NOT NULL,
    schedule_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    post_type INTEGER NOT NULL,
    s3_key VARCHAR(255) NOT NULL,
    title VARCHAR(80) NOT NULL,
    status INTEGER NOT NULL DEFAULT 1,
    description TEXT NOT NULL,
    CONSTRAINT posts_pkey PRIMARY KEY (post_id),
    CONSTRAINT fk_client_post FOREIGN KEY (client_id) REFERENCES clients (client_id),
    CONSTRAINT fk_network_post FOREIGN KEY (network_id) REFERENCES social_networks (network_id)
);

-- ============================================================
-- Seed: Admin User
-- ============================================================
-- recovery_hash allows first-time password setup via:
--   /reset-password/initial-setup-rodrigo
-- ============================================================

INSERT INTO users (
    user_id, created_at, updated_at, hash, slug, email, name,
    password, is_admin, recovery_hash, status
)
SELECT
    nextval('user_id_seq'),
    NOW(), NOW(),
    'initial-hash-' || md5(random()::text),
    'rodrigo',
    'rodrigo@emagine.com.br',
    'Rodrigo',
    NULL,
    TRUE,
    'initial-setup-rodrigo',
    1
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'rodrigo@emagine.com.br'
);
