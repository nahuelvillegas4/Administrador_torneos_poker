import React, { useEffect, useState } from "react";
import mesasService from "../../../services/mesasService";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import croupierService from "../../../services/croupierService";
import torneosService from "../../../services/torneosService";
import { useForm } from "react-hook-form";

export const Editarmesa = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const {} = useSearchParams();
    const [crupiers, setCrupiers] = useState([]);
    const [torneos, setTorneos] = useState([]);
    const [mesa, setMesa] = useState();
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            mesasService.getMesaById(state.idMesa),
            croupierService.getCrupiers(),
            torneosService.getTorneos()
        ])
        .then(([mesaData, crupiersData, torneosData]) => {
            setMesa(mesaData);
            setCrupiers(crupiersData);
            setTorneos(torneosData);
        });
    }, []);

    const onSubmit = (data) => {
        const mesa = {
            idMesa: state.idMesa,
        };

        if (data.idTorneo) {
            mesa.idTorneo = data.idTorneo;
        } else {
            mesa.idTorneo = state.idTorneo;
        }

        if (data.idCrupierMesa) {
            mesa.idCrupierMesa = data.idCrupierMesa;
        } else {
            mesa.idCrupierMesa = state.idCrupierMesa;
        }

        if (data.nombreMesa) {
            mesa.nombreMesa = data.nombreMesa;
        } else {
            mesa.nombreMesa = state.nombreMesa;
        }

        

        const fechaActual = new Date();
        const fechaSinHora = fechaActual.toISOString().split('T')[0];

        mesa.fechaCreacionMesa = state.fechaCreacionMesa;
        mesa.fechaActualizacionMesa = fechaSinHora;

        mesasService.putMesa(mesa);
        navigate('/mesas');
    };

    const onVolver = () => {
        navigate('/mesas');
    };

    return (
        <div className="m-3">
            <h2>Modificar Mesa</h2>
            {mesa && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-container">
                        <label className="form-label" htmlFor="idTorneo">Torneo:</label>
                        <select id='idTorneo' className="form-select" {...register("idTorneo")} defaultValue={mesa.idTorneo}>
                            <option value="">Seleccionar Torneo</option>
                            {torneos.map((torneo) => (
                                <option key={torneo.idTorneo} value={torneo.idTorneo}>
                                    {torneo.nombreTorneo}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="idCrupierMesa">Crupier:</label>
                        <select id='idCrupierMesa' className="form-select" {...register("idCrupierMesa")} defaultValue={mesa.idCrupierMesa}>
                            <option value="">Seleccionar Crupier</option>
                            {crupiers.map((crupier) => (
                                <option key={crupier.idCrupier} value={crupier.idCrupier}>
                                    {crupier.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-container">
                        <label className="form-label" htmlFor="nombreMesa">Nombre Mesa:</label>
                        <input type="text" className="form-input" id="nombreMesa"  {...register("nombreMesa")} defaultValue={mesa.nombreMesa} />
                    </div>
                    <div className="form-container form-label">
                        <button className="button-crear" type="submit">Modificar Mesa</button>
                        
                        <button className="button-crear" onClick={onVolver}>Volver</button>
                    </div>
                </form>
            )}
        </div>
    );
};
