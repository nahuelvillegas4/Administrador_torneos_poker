import React, { useEffect, useState } from "react";
import croupierService from "../../../services/croupierService";
import torneosService from "../../../services/torneosService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import mesasService from "../../../services/mesasService";

export default function RegistrarMesa() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [crupiers, setCrupiers] = useState([]);
    const [torneos, setTorneos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            croupierService.getCrupiers(),
            torneosService.getTorneos()
        ])
        .then(([crupiersData, torneosData]) => {
            setCrupiers(crupiersData);
            setTorneos(torneosData);
        });
    }, []);

    const onSubmit = async (data) => {
        const fechaActual = new Date();
        const year = fechaActual.getFullYear();
        const month = String(fechaActual.getMonth() + 1).padStart(2, '0');
        const day = String(fechaActual.getDate()).padStart(2, '0');
        const hours = String(fechaActual.getHours()).padStart(2, '0');
        const minutes = String(fechaActual.getMinutes()).padStart(2, '0');

        const fechaConHora = `${year}/${month}/${day} ${hours}:${minutes}`;
        console.log(fechaConHora)
        data.jugadoresActualesMesa = 0
        data.fechaActualizacionMesa = fechaConHora;

        await mesasService.postMesa(data)
            .then(() => {
                navigate('/mesas');
            })
            .catch((error) => {
                console.error('Error al crear la mesa: ', error);
            });
    };

    const onVolver = () => {
        navigate('/mesas');
    };

    const validateNombreMesa = (value) => {
        // Validación para caracteres alfanuméricos y máximo 50 caracteres
        if (!/^[a-zA-Z0-9 ]{1,50}$/.test(value)) {
            return "Nombre inválido: solo se permiten carácteres alfanuméricos y máximo 50 caracteres.";
        }
        return true;
    };


    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                <h3>Registrar Nueva Mesa</h3>
                <div className="form-container">
                    <label className="form-label" htmlFor="nombreMesa">Nombre Mesa:</label>
                    <input
                        type="text"
                        className="form-input"
                        id="nombreMesa"
                        {...register("nombreMesa", {
                            required: 'Este campo es requerido',
                            validate: validateNombreMesa
                        })}
                    />
                    {errors.nombreMesa && <span className='error'>{errors.nombreMesa.message}</span>}
                </div>
                <div className="form-container">
                    <label className="form-label" htmlFor="idTorneo">Torneo: </label>
                    <select id='idTorneo' className="form-select" {...register("idTorneo", { required: 'Este campo es requerido' })}>
                        <option value="">Seleccionar Torneo</option>
                        {torneos.map((torneo) => (
                            <option key={torneo.idTorneo} value={torneo.idTorneo}>
                                {torneo.nombreTorneo}
                            </option>
                        ))}
                    </select>
                    {errors.idTorneo && <span className='error'>{errors.idTorneo.message}</span>}
                </div>
                <div className="form-container">
                    <label className="form-label" htmlFor="idCrupier">Crupier:</label>
                    <select id='idCrupier' className="form-select" {...register("idCrupierMesa", { required: 'Este campo es requerido' })}>
                        <option value="">Seleccionar crupier</option>
                        {crupiers.map((crupier) => (
                            <option key={crupier.idCrupier} value={crupier.idCrupier}>
                                {crupier.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.idCrupierMesa && <span className='error'>{errors.idCrupierMesa.message}</span>}
                </div>
                <div className="form-container form-label div-crear ">
                    <button type="submit" style= {{width: "95px", height: "40px", fontSize: "15px"}}>
                        Registrar
                    </button>
                    <button type="reset" style= {{width: "95px", height: "40px", fontSize: "15px"}} onClick={() => reset()}>
                        Limpiar
                    </button>
                    <button style= {{width: "95px", height: "40px", fontSize: "14px"}} onClick={onVolver}>
                      <i class="bi bi-arrow-left-square-fill"></i> Volver
                    </button>
                </div>
            </form>
        </div>
    );
}
