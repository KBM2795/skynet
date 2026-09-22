-- ──────────────────────────────────────────────────────────
--  Migration: 000001_create_organizations_and_users.down.sql
-- ──────────────────────────────────────────────────────────

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
