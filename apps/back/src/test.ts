import sql from './infra/db';

async function testConnection() {
  try {
    const res = await sql`SELECT NOW()`;
    console.log('✅ Conectado:', res);
  } catch (err) {
    console.error('❌ Erro:', err);
  }
}

testConnection();