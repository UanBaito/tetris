import { Client } from 'pg';
import 'dotenv/config';

const db = new Client();
async function connectToDB() {
	await db.connect();
}
connectToDB();

export default db;
