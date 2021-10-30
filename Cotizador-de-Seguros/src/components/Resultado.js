import React, {Fragment} from 'react';
import styled from '@emotion/styled';
import Spinner from './Spinner'

const Resultado = ({error, spinner, total}) => {

    const Center = styled.div`
        margin: 40px 0 20px 0;
        text-align: center;
    `;
    const Result = styled.p`
        display: inline-block;
        width: 140px;
        height: 40px;
        font-size: 24px;
    `;
    const Span = styled.span`
        font-size: 25px;
        border-bottom: 2px solid;
    `;
    const Error = styled.div`
        color: #c1502e;
        font-size: 21px;
        font-weight: 900;
        padding-bottom: 20px;
    `;
    return ( 
        <Center>
            {total && <Fragment><Result>El total es: </Result><Span>$ {total}</Span></Fragment>}
            {spinner && <Spinner />}
            {error && <Error>Todos los campos son obligatorios!</Error>}
        </Center>
     );
}
 
export default Resultado;