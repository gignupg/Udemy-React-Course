import React from 'react';
import PropTypes from 'prop-types';

const Citas = ({ value, eliminar }) => (

    <div className="citas">
        {Object.keys(value).map(elem => {
            const capitalized = elem.slice(0, 1).toUpperCase() + elem.slice(1);
            if (elem === "id") return <button key={elem} className="u-full-width" onClick={() => eliminar(value.id)}>Eliminar &times;</button>;
            return <p className="cita" key={elem}><strong>{capitalized}: </strong><span>{value[elem]}</span></p>;
        })}
    </div>
);

Citas.propTypes = {
    value: PropTypes.object.isRequired,
    eliminar: PropTypes.func.isRequired,
}

export default Citas;