import React, { useEffect, useState } from "react";
import mesasService from "../../../services/mesasService";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import jugadoresService from "../../../services/jugadoresService";
import { useForm } from "react-hook-form";

export const EditarJugador = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const {} = useSearchParams();
    const [mesas, setMesas] = useState([]);
    const [jugador, setJugador] = useState();
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            jugadoresService.getJugadorById(state.idJugador),
            mesasService.getMesas()
        ])
        .then(([jugadorData, mesasData]) => {
            setJugador(jugadorData);
            setMesas(mesasData);
        });
    }, []);

    const onSubmit = (data) => {
        const jugador = {
            idJugador: state.idJugador,
        };

        if (data.nombreJugador) {
            jugador.nombreJugador = data.nombreJugador;
        } else {
            jugador.nombreJugador = state.nombreJugador;
        }

        if (data.edadJugador) {
            if (validateEdad(data.edadJugador)) {
            jugador.edadJugador = data.edadJugador;}
            else {
            {errors.edadJugador && <span className='error'>{errors.edadJugador.message}</span>}
            }
        } else {
            jugador.edadJugador = state.edadJugador;
        }

        if (data.emailJugador) {
            jugador.emailJugador = data.emailJugador;
        } else {
            jugador.emailJugador = state.emailJugador;
        }

        const fechaActual = new Date();
        const fechaSinHora = fechaActual.toISOString().split('T')[0];

        jugador.fechaCreacionJugador = state.fechaCreacionJugador;
        jugador.fechaActualizacionJugador = fechaSinHora;

        jugadoresService.putJugador(jugador);
        navigate('/jugadores');
    };

    const onVolver = () => {
        navigate('/jugadores');
    };

    const validateEdad = (value) => {
        // Validación para edad entre 18 y 100 años
        const fecha_nac = new Date(value);
        const fecha_act = new Date()
        const edad = (((((fecha_act - fecha_nac)/1000)/3600)/24)/365)
        if (isNaN(edad) || edad < 18 || edad > 100) {
            return "Edad inválida: debe ser mayor a 18 años y menor a 100 años.";
        }
        return true;
    };
    
    return (
        <div className="m-3">
            <h2>Modificar Jugador</h2>
            {jugador && (
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-container">
                        <label className="form-label" htmlFor="nombreJugador">Nombre Jugador:</label>
                        <input type="text" className="form-input" id="nombreJugador" {...register("nombreJugador")} defaultValue={jugador.nombreJugador} />
                    </div>

                    <div className="form-container">
                    <label class="form-label" htmlFor="edadJugador">Fecha de nacimiento:</label>
                    <input type="date" class="form-input" id="edadJugador"  {...register("edadJugador")}/>
                    {errors.edadJugador && <span className='error'>{errors.edadJugador.message}</span>}
                </div>

                    <div className="form-container">
                        <label className="form-label" htmlFor="emailJugador">Email Jugador:</label>
                        <input type="email" className="form-input" id="emailJugador" {...register("emailJugador")} defaultValue={jugador.emailJugador}/>
                    </div>

                    <div className="form-container form-label">
                        <button className="form-button bg-success" type="submit">Modificar Jugador</button>
                        <button className="form-button bg-success" onClick={onVolver}>Volver</button>
                    </div>
                </form>
            )}
        </div>
    );
};
