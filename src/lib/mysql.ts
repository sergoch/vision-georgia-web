
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'your-mysql-host',
  user: 'your-mysql-user',
  password: 'your-mysql-password',
  database: 'your-database-name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
