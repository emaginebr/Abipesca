#!/bin/sh
# Run database migrations against the running postgres container
# Usage: ./migrate.sh

set -e

CONTAINER="abipesca-postgres"

echo "Running migrations on $CONTAINER..."

docker cp docker/postgres/migrations.sql "$CONTAINER":/tmp/migrations.sql

docker exec "$CONTAINER" sh -c \
  'psql -v ON_ERROR_STOP=1 --username "$DB_USER" --dbname "$DB_NAME" -f /tmp/migrations.sql'

echo "Migrations completed successfully."
