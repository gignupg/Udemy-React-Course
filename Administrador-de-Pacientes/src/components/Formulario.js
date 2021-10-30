import React from 'react';
import PropTypes from 'prop-types';

const Formulario = ({handleSubmit, error}) => {

    return (
        <React.Fragment>
            <h3>Formulario</h3>
            {error && <h4>Todos los campos son obligatorios!</h4>}
            <form onSubmit={handleSubmit}>
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Cómo se llama la mascota?"
                    name="mascota"
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Cómo se llama el dueño de la mascota?"
                    name="dueño"
                />

                <label>Fecha</label>
                <input
                    type="date"
                    className="u-full-width"
                    name="fecha"
                />

                <label>Hora</label>
                <input
                    type="time"
                    className="u-full-width"
                    name="hora"
                />

                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    placeholder="Descríbe las síntomas!"
                    name="síntomas"
                ></textarea>

                <button
                    className="u-full-width button-primary"
                    type="submit"
                >Agregar Cita</button>
            </form>
        </React.Fragment>
    );
};

Formulario.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
}

export default Formulario;