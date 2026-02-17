#!/bin/sh
set -e

# Create application user and database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}';
    CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};
    GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
EOSQL

# Run migrations on the application database
psql -v ON_ERROR_STOP=1 --username "$DB_USER" --dbname "$DB_NAME" -f /docker-entrypoint-initdb.d/migrations.sql
