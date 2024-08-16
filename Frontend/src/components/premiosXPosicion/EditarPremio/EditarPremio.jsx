import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import torneosService from "../../../services/torneosService";
import premiosService from "../../../services/premiosService";

export const EditarPremio = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [torneos, setTorneos] = useState([]);
    const [premio, setPremio] = useState(null);
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPremio = async () => {
            try {
                const premioData = await premiosService.getPremioById(state.numeroPosicion, state.idTorneo);
                setPremio(premioData);

                const torneosData = await torneosService.getTorneos();
                setTorneos(torneosData);
            } catch (error) {
                console.error("Error al obtener datos del premio:", error);
            }
        };

        fetchPremio();
    }, [state.numeroPosicion, state.idTorneo]);

    const onSubmit = async (data) => {
        try {
            const premioActualizado = {
                numeroPosicion: state.numeroPosicion,
                idTorneo: state.idTorneo,
                premio: data.premio || premio.premio,
            };
            const fechaActual = new Date();
            const fechaSinHora = fechaActual.toISOString().split('T')[0];
            premioActualizado.fechaActualizacionPremio = fechaSinHora;

            await premiosService.putPremio(state.numeroPosicion, state.idTorneo, premioActualizado);

            navigate('/premios');
        } catch (error) {
            console.error("Error al actualizar el premio:", error);
        }
    };

    const onVolver = () => {
        navigate('/premios');
    };

    return (
        <div className="m-3">
            <h2>Modificar Premio</h2>
            {premio && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-container">
                        <label className="form-label" htmlFor="numeroPosicion">Número de Posición:</label>
                        <input
                            type="number"
                            className="form-input"
                            id="numeroPosicion"
                            value={premio.numeroPosicion}
                            disabled
                        />
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="idTorneo">Torneo:</label>
                        <select id='idTorneo' {...register("idTorneo")} defaultValue={premio.idTorneo} disabled>
                            {torneos.map((torneo) => (
                                <option key={torneo.idTorneo} value={torneo.idTorneo}>
                                    {torneo.nombreTorneo}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="premio">Premio:</label>
                        <input
                            type="number"
                            className="form-input"
                            id="premio"
                            defaultValue={premio.premio}
                            {...register("premio", {
                                required: 'Este campo es requerido',
                                min: { value: 1, message: 'El valor debe ser mayor que 0' }
                            })}
                        />
                        {errors.premio && <span className='error'>{errors.premio.message}</span>}
                    </div>
                    <div className="form-container form-label">
                        <button className="form-button bg-success" type="submit">Modificar Premio</button>
                        <button className="form-button bg-success" type="button" onClick={() => reset()}>Limpiar</button>
                        <button className="form-button bg-success" onClick={onVolver}>Volver</button>
                    </div>
                </form>
            )}
        </div>
    );
};
