import { db } from '../db';
import { sql } from 'drizzle-orm';

async function reset() {
  console.log('🗑️  Emptying the entire database');

  // Supprimer toutes les tables
  const dropTablesQuery = sql.raw(`
    DO $$ 
    DECLARE 
      r RECORD;
    BEGIN
      FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
      END LOOP;
    END $$;
  `);

  // Supprimer tous les types enum
  const dropEnumsQuery = sql.raw(`
    DO $$ 
    DECLARE 
      r RECORD;
    BEGIN
      FOR r IN (SELECT typname FROM pg_type WHERE typtype = 'e') LOOP
        EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.typname) || ' CASCADE';
      END LOOP;
    END $$;
  `);

  console.log('📨 Sending delete queries...');

  await db.transaction(async (tx) => {
    await tx.execute(dropTablesQuery);
    await tx.execute(dropEnumsQuery);

    console.log('✅ Database emptied');
  });
}

reset().catch((e) => {
  console.error(e);
});
