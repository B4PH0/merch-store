import mongoose, { Connection } from 'mongoose';
import { config } from 'dotenv';
config();

mongoose.connect(process.env.DB_CONNECTION_STRING);
const db_connection: Connection = mongoose.connection;
export { db_connection };
