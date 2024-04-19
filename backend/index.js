import express from 'express';
import cors from 'cors';
import pg from 'pg';
import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD,PORT } from './config.js';

const app = express();
const pool = new pg.Pool({
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  host: DB_HOST
});

app.use(cors());

app.get('/ping', async(req, res) => {

  const result = await pool.query('SELECT NOW()');
  console.log(result);

  res.send(
    {
      pong: result.rows[0].now
    }
  );
});

app.listen(PORT, () => {
  console.log('Server is running on port 3001');
});