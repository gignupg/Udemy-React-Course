import React from 'react'

const Listado = ({list, presupuesto, restante, semaforo}) => {
    return ( 
        <div className="six columns">
            <h4>Listado</h4>
            {list.map(elem => (
                <div key={elem.id}>
                    <p className="list-nombre">
                    {elem.nombre} 
                    <span className="u-pull-right list-cantidad">${elem.cantidad}</span>
                    </p>
                </div>
            ))}
            <p className="presupuesto">Presupuesto: $ {presupuesto}</p>
            <p className={semaforo}>Restante: $ {restante}</p>
        </div>
     );
}
 
export default Listado;