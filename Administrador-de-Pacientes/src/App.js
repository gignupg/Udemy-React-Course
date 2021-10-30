import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Citas from './components/Citas';
import { v4 as uuidv4 } from 'uuid';


function App() {

  const stored = JSON.parse(localStorage.getItem("values"));

  const citasIniciales = stored ? stored : [];

  const [values, setValues] = useState(citasIniciales);
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    const valueArray = {
      mascota: e.target.elements.mascota.value.trim(),
      dueño: e.target.elements.dueño.value.trim(),
      fecha: e.target.elements.fecha.value.trim(),
      hora: e.target.elements.hora.value.trim(),
      síntomas: e.target.elements.síntomas.value.trim(),
      id: uuidv4(),
    };

    const emptyValue = Object.keys(valueArray).some(elem => valueArray[elem] === "");

    if (!emptyValue) {
      setValues([
        ...values,
        valueArray
      ])
      setError(false)
    } else {
      setError(true)
    }
  };

  useEffect(() => {
    localStorage.setItem("values", JSON.stringify(values))
  }, [values])

  const handleEliminación = (key) => {
    setValues(values.filter(elem => elem.id !== key));
  };

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="six columns">
            <Formulario 
              error={error}
              handleSubmit={handleSubmit} 
            />
          </div>
          <div className="six columns">
            <h3>Citas</h3>
            {values.map(elem => (
              <Citas
                value={elem}
                eliminar={handleEliminación}
                key={elem.id}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
