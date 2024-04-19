import React,{useState} from 'react';
import './App.css';

function App() {

  //TOMA LA URL DEL ARCHIVO .ENV
  const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';
  console.log(URL);

  const [result, setResult] = useState([]); // Variable para almacenar la respuesta del reque

  return (
    <div className="App">

      <div>
        <h1>Lista de Actividades</h1>
      </div>

      <button onClick={async() => {const rest = await fetch(`${URL}/ping`); const data = await rest.json(); console.log(data); setResult(data)}}>
        backend
      </button>

      <pre>
        {JSON.stringify(result, null, 2)}
      </pre>

      <div>
        <h2>Actividades</h2>
          <li>Actividad 1</li>
          <li>Actividad 2</li>
          <li>Actividad 3</li>
      </div>

    </div>
  );
}

export default App;
