import { Client } from 'pg';
import 'dotenv/config';

const db = new Client({ connectionString: process.env.PGURL });
async function connectToDB() {
	await db.connect();
}
connectToDB();

export default db;
