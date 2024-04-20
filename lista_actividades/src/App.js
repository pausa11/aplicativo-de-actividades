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

  //-----------------------------------

  const canciones = ['houdini.mp3', 'zeze.mp3','gose.mp3','party.mp3'];

  const [cancion, setCancion] = useState('Reproducir canción aleatoria');
  const [audio, setAudio] = useState(null); // Estado para almacenar el objeto de audio

  const cancionAleatoria = () => {
    console.log('Reproducir canción aleatoria');
    // Si hay una canción reproduciéndose, detenerla
    if (audio) {
      audio.pause();
    }
    // Seleccionar una nueva canción aleatoria y reproducirla
    const cancionAleatoria = canciones[Math.floor(Math.random() * canciones.length)];
    setCancion(cancionAleatoria);
    const nuevoAudio = new Audio(cancionAleatoria);
    setAudio(nuevoAudio); // Actualizar el estado del objeto de audio
    nuevoAudio.play();
  }

  const pararCancion = () => {
    console.log('Parar canción');
    if (audio) {
      audio.pause();
    }
  }

  return (
    <div className="App" style={{background:'#E6E4D5',height: '100vh', display: 'flex', flexDirection: 'column', fontFamily:'calibri',alignItems:'center'}}>

      <div style={{display: 'flex',justifyContent: 'center', width:'100%', alignItems: 'center',marginBottom:'5vh',background:'#F1524A',height:'10vh',color:'white'}}>
        <img src="hearth.png" alt="heart" style={{height:'8vh',margin:'2vh'}}/>
        <text style={{margin:'0', fontSize:'4vh',letterSpacing:'.1vh',fontWeight:'700'}}>Actividades de Luisa y Daniel  </text>
      </div>

      <div style={{display: 'flex',justifyContent: 'center',flexDirection:'column', alignItems: 'center',borderRadius: '3vw',background:'#0D3876', height:'25vh',width:'80%',marginBottom:'5vh'}}>
        <input
          type="text"
          value={nombreactividad}
          placeholder="Nombre de la actividad"
          onChange={(e) => setNombreActividad(e.target.value)}
          style={{marginBottom:'1vh'}}
        />
        <input
          type="date"
          value={fechaactividad}
          onChange={(e) => setFechaActividad(e.target.value)}
          style={{marginBottom:'3vh'}}
        />

        <button onClick={agregarActividad} style={{height:'6vh'}}>Agregar Actividad</button>
      </div>

      <div style={{display: 'flex',justifyContent: 'center',flexDirection:'column', alignItems: 'center',borderRadius: '3vw',background:'#127F96',width:'80%',color:'white',padding:'1vh'}}>
        <h2 style={{margin:'0'}}>Actividades</h2>
        <div style={{marginTop:'2vh'}}>
          {actividades.map((actividad) => (
            <text key={actividad.id} style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:'2vh'}}>
              <strong>Nombre:</strong> {actividad.nombreactividad} <br />
              <strong>Fecha:</strong> {new Date(actividad.fechaactividad).toLocaleDateString()
              }
            <br /> 
            <button onClick={() => eliminarActividad(actividad.id)} style={{marginTop:'.5vh'}}>Eliminar</button>
            </text>
          ))}
        </div>
      </div>

      <div style={{marginTop:'1vh',display:'flex',flexDirection:'column'}}>
        <button onClick={() => {cancionAleatoria();}} style={{height:'6vh',background:'#F1524A',color:'white',borderRadius:'1vh'}}>
          {cancion}
        </button>

        <button onClick={() => {pararCancion();}} style={{marginTop:'1vh',height:'6vh',background:'#F1524A',color:'white',borderRadius:'1vh'}}>
          pausar cancion
        </button>

      </div>

      <div style={{marginTop:'1vh'}}>
        nuestro aplicativo web :)
      </div>
    </div>
  );
}

export default App;
