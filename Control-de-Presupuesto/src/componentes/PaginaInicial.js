import React from 'react'

const PaginaInicial = ({inicialSubmit, error}) => {
    return ( 
        <div className="twelve columns box-inside">
            <h4 className="u-full-width">Coloca tu presupuesto</h4>
            {error && <p className="error">El presupuesto debe ser superior a zero!</p>}
            <form onSubmit={inicialSubmit}>
                <input name="inputField" className="u-full-width" type="number"/>
                <button className="u-full-width button-primary">Definir Presupuesto</button>
            </form>
        </div>
     );     
}
 
export default PaginaInicial;