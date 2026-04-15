import 'dotenv/config';
import pkg from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const { PrismaClient, Role, Major } = pkg;

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('POSTGRES_URL is not set');
}

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  for (const account of config.defaultAccounts) {
    const role = (account.role as typeof Role[keyof typeof Role]) || Role.USER;
    const major = (account.major as typeof Major[keyof typeof Major]) || Major.Other;

    console.log(`Creating user: ${account.email} with role: ${role}`);

    await prisma.user.upsert({
      where: { email: account.email },
      update: {
        password,
        fullName: account.fullName,
        role,
        major,
      },
      create: {
        email: account.email,
        password,
        fullName: account.fullName,
        role,
        major,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });