import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

  const [actividades, setActividades] = useState([]);
  const [nombreactividad, setNombreActividad] = useState('');
  const [fechaactividad, setFechaActividad] = useState('');

  useEffect(() => {
    fetchActividades();
    // eslint-disable-next-line
  }, []); 

  const fetchActividades = async () => {
    try {
      const response = await axios.get(URL);
      setActividades(response.data.actividades);
    } catch (error) {
      console.error('Error al obtener actividades:', error);
    }
  };

  const agregarActividad = async () => {
    try {
      await axios.post(URL, { // Usa axios.post en lugar de fetch
        nombreactividad,
        fechaactividad,
      });
      fetchActividades();
      setNombreActividad('');
      setFechaActividad('');
    } catch (error) {
      console.error('Error al agregar actividad:', error);
    }
  };

  const eliminarActividad = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      setActividades(actividades.filter((actividad) => actividad.id !== id));
    } catch (error) {
      console.error('Error al eliminar actividad:', error);
    }
  }

  return (
    <div className="App">
      <div>
        <h1>Lista de Actividades</h1>
      </div>

      <div>
        <input
          type="text"
          value={nombreactividad}
          placeholder="Nombre de la actividad"
          onChange={(e) => setNombreActividad(e.target.value)}
        />
        <input
          type="date"
          value={fechaactividad}
          onChange={(e) => setFechaActividad(e.target.value)}
        />
        <button onClick={agregarActividad}>Agregar Actividad</button>
      </div>

      {/* <button onClick={fetchActividades}>Obtener Actividades</button> */}

      <div>
        <h2>Actividades</h2>
        <ul>
          {actividades.map((actividad) => (
            <li key={actividad.id}>
              <strong>Nombre:</strong> {actividad.nombreactividad}, 
              <strong>Fecha:</strong> {new Date(actividad.fechaactividad).toLocaleDateString()
              } <button onClick={() => eliminarActividad(actividad.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
