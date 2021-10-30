import React, {useState} from 'react';
import shortid from 'shortid';

const Formulario = ({list, setList, restante, setRestante }) => {

    const [gastoError, setGastoError] = useState(false);

    const handleGasto = (e) => {
        e.preventDefault();

        const nombre = e.target.elements.nombre.value.trim();
        const cantidad = e.target.elements.cantidad.value.trim();

        if (!nombre || !cantidad) {
            setGastoError(true);
        } else {
            setGastoError(false);
            setList([
                ...list,
                {
                    nombre,
                    cantidad,
                    "id": shortid.generate()
                }
            ]);
            setRestante(restante - cantidad);
        }
    };

    return (
        <div className="six columns">
            <h4>Agrega tus gastos aquí</h4>
            {gastoError && <p className="error">Todos los campos son obligatorios</p>}
            <form onSubmit={handleGasto}>
                <label>Nombre Gasto</label>
                <input
                    name="nombre"
                    className="u-full-width"
                    type="text"
                />
                <label>Cantidad Gasto</label>
                <input
                    name="cantidad"
                    className="u-full-width"
                    type="number"
                />
                <button
                    className="button-primary u-full-width gasto"
                    type="submit"
                >Agregar Gasto</button>
            </form>
        </div>
    );
};

export default Formulario;