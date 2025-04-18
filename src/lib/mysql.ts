
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'gqjbccmq_rvision',
  password: 'xyskas-saHnim-5kutja',
  database: 'gqjbccmq_rvision',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
