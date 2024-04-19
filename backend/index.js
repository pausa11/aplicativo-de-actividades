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
app.use(express.json()); // Agrega este middleware para analizar el cuerpo de las solicitudes JSON

app.get('/', async(req, res) => {

  const result = await pool.query('SELECT * FROM actividades');
  console.log(result);

  res.send(
    {
      actividades: result.rows
    }
  );
});

app.post('/', async(req, res) => {
  console.log('en post')
  const { nombreactividad, fechaactividad } = req.body;
  console.log(nombreactividad, fechaactividad);
  const result = await pool.query('INSERT INTO actividades (nombreactividad, fechaactividad) VALUES ($1, $2)', [nombreactividad, fechaactividad]);
  console.log(result);
  res.send(
    {
      actividades: result.rows
    }
  );
});

app.delete('/:id', async(req, res) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM actividades WHERE id = $1', [id]);
  console.log(result);
  res.send(
    {
      actividades: result.rows
    }
  );
});

app.listen(PORT, () => {
  console.log('Server is running on port 3001');
});