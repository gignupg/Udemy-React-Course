import React, { useState } from 'react';
import styled from '@emotion/styled';
import { obtenerMarca, obtenerAño, obtenerPlan } from '../helper';

const Label = styled.label`
    display: inline-block;
    font-size: 19px;
    width: calc(20% - 10px);
    margin-right: 10px;
`;
const RadioLabel = styled.label`
    margin: 0 20px 0 5px;
`;
const Select = styled.select`
    display: inline-block;
    width: 80%;
    height: 30px;
    margin-bottom: 25px;
    background-color: rgb(104,98,86,0.7);
    font-size: 18px;
`;
const Boton = styled.button`
    height: 40px;
    width: 100%;
    margin-top: 40px;
    background-color: #a96e5b;
    border-radius: 20px;
    font-size: 21px;
    color: white;
    font-weight: 800;
    letter-spacing: 1.5px;
    &:hover {
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
`;

const Formulario = ({ setError, setSpinner, setTotal }) => {

    const [options, setOptions] = useState({
        marca: "",
        año: "",
        plan: "",
    });

    const { plan, marca, año } = options;

    const calcularPrecio = (e) => {
        e.preventDefault();

        if (marca === "" || año === "" || plan === "") {
            setTotal(false);
            setError(true);
        } else {
            setError(false);
            setTotal(false);
            setSpinner(true);
            const total = obtenerPlan(plan) + obtenerMarca(marca) - obtenerAño(año);
            setTimeout(() => {
                setSpinner(false);
                setTotal(total);
            }, 3000);
        }
    };

    const updateOptions = (e) => {

        setOptions({
            ...options,
            [e.target.name]: e.target.value.trim()
        });
    };

    return (
        <form onSubmit={calcularPrecio}>
            <Label>Marca</Label>
            <Select onChange={updateOptions} name="marca">
                <option value="">-- Seleccione --</option>
                <option value="americano">Americano</option>
                <option value="europeo">Europeo</option>
                <option value="asiatico">Asiatico</option>
            </Select>
            <Label>Año</Label>
            <Select onChange={updateOptions} name="año">
                <option value="">-- Seleccione --</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
            </Select>
            <Label>Plan</Label>
            <input
                name="plan"
                type="radio"
                value="basico"
                id="basico"
                checked={plan === 'basico'}
                onChange={updateOptions}
            /><RadioLabel htmlFor="basico">Básico</RadioLabel>
            <input
                name="plan"
                type="radio"
                value="completo"
                id="completo"
                checked={plan === 'completo'}
                onChange={updateOptions}
            /><RadioLabel htmlFor="completo">Completo</RadioLabel>
            <Boton type="submit">Cotizar</Boton>
        </form>
    );
};

export default Formulario;