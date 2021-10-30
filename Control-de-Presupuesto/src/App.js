import React, { Fragment, useState, useEffect } from 'react';
import PaginaInicial from './componentes/PaginaInicial';
import Formulario from './componentes/Formulario';
import Listado from './componentes/Listado';


function App() {

  const [start, setStart] = useState(true);
  const [presupuesto, setPresupuesto] = useState(0);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [restante, setRestante] = useState(0)
  const [semaforo, setSemaforo] = useState("semaforo-turquesa")

  const inicialSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.inputField.value;

    if (inputValue <= 0) {
      setError(true);
    } else {
      setPresupuesto(inputValue);
      setRestante(inputValue)
      setError(false);
      setStart(false);
    }
  };

  useEffect(() => {
    if (restante < (presupuesto * 0.15)) {
      setSemaforo("semaforo-rojo")
    } else if (restante < (presupuesto * 0.3)) {
      setSemaforo("semaforo-amarillo")
    } else {
      setSemaforo("semaforo-turquesa")
    }
  }, [presupuesto, restante])

  return (
    <Fragment>
      <h1>Gasto Semanal</h1>
      <div className="container box">
        <div className="row">
          {start &&
            <PaginaInicial
              inicialSubmit={inicialSubmit}
              error={error}
            />}
          {!start &&
            <div className="box-inside">
              <Formulario
                list={list}
                setList={setList}
                restante={restante}
                setRestante={setRestante}
              />
              <Listado
                presupuesto={presupuesto}
                list={list}
                restante={restante}
                semaforo={semaforo}
              />
            </div>
          }
        </div>
      </div>
    </Fragment>
  );
}

export default App;
