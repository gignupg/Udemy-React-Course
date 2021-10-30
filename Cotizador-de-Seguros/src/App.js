import React, { useState } from 'react';
import styled from '@emotion/styled';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';

const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: rgb(255,255,255,0.7);
`;

const Header = styled.h1`
  margin: 0;
  padding: 10px;
  background-color: #587e76;
  text-align: center;
`;

const OuterBox = styled.div`
  display: inline-block;
  width: 100%;
`;

const InnerBox = styled.div`
  margin: 40px 40px 15px 40px;
`;

function App() {

  const [error, setError] = useState(false);
  const [total, setTotal] = useState(false);
  const [spinner, setSpinner] = useState(false);

  return (
    <Contenedor>
      <Header>Cotizador de Seguros</Header>
      <OuterBox>
        <InnerBox>
          <Formulario setError={setError} setTotal={setTotal} setSpinner={setSpinner} />
          <Resultado error={error} total={total} spinner={spinner}/>
        </InnerBox>
      </OuterBox>
    </Contenedor>
  );
}

export default App;
