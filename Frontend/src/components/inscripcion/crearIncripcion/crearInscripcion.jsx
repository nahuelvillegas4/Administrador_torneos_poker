import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import inscripcionService from "../../../services/inscripcionService";
import torneosService from "../../../services/torneosService";
import jugadoresService from "../../../services/jugadoresService";
import mesasService from "../../../services/mesasService";

export default function RegistrarInscripcion() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [torneos, setTorneos] = useState([]);
    const [jugadores, setJugadores] = useState([]);
    const [mesas, setMesas] = useState([]);
    const [mesasFiltradas, setMesasFiltradas] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [torneosData, jugadoresData, mesasData] = await Promise.all([
                    torneosService.getTorneos(),
                    jugadoresService.getJugadores(),
                    mesasService.getMesas()
                ]);
                setTorneos(torneosData);
                setJugadores(jugadoresData);
                setMesas(mesasData);
            } catch (error) {
                console.error("Error al obtener datos: ", error);
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (data) => {
        const fechaActual = new Date().toISOString().split('T')[0];
        data.fechaCreacionInscripcion = fechaActual;
        data.fechaActualizacionInscripcion = fechaActual;

        try {
            await inscripcionService.postInscripcion(data);
            navigate('/inscripcion');
        } catch (error) {
            console.error('Error al crear la inscripción: ', error);
        }
    };

    const onVolver = () => {
        navigate('/inscripcion');
    };

    const handleTorneoChange = async (event) => {
        const selectedTorneoId = event.target.value
        const data = {}
        if (selectedTorneoId){
          data.idTorneo = selectedTorneoId
          const mesasFiltradas = await mesasService.getMesasFiltradas(data)
          setMesasFiltradas(mesasFiltradas)
          console.log(mesasFiltradas)
        } else {
          setMesasFiltradas([])
        }
    }

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                <h3>Registrar Nueva Inscripción</h3>
                <div className="form-container">
                    <label className="form-label" htmlFor="idTorneo">Torneo:</label>
                    <select id="idTorneo" {...register("idTorneo", { required: 'Este campo es requerido' })} onChange={handleTorneoChange}>
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
                    <label className="form-label" htmlFor="idMesa">Mesa:</label>
                    <select id="idMesa" {...register("idMesa", { required: 'Este campo es requerido' })}>
                        <option value="">Seleccionar Mesa</option>
                        {mesasFiltradas.filter((mesa) => mesa.cantidadJugadores < 10)
                                        .map((mesa) => (
                                        <option key={mesa.idMesa} value={mesa.idMesa}>
                                            {mesa.nombreMesa}
                                        </option>
                        ))}
                    </select>
                    {errors.idMesa && <span className='error'>{errors.idMesa.message}</span>}
                </div>
                <div className="form-container">
                    <label className="form-label" htmlFor="idJugador">Jugador:</label>
                    <select id="idJugador" {...register("idJugador", { required: 'Este campo es requerido' })}>
                        <option value="">Seleccionar Jugador</option>
                        {jugadores.map((jugador) => (
                            <option key={jugador.idJugador} value={jugador.idJugador}>
                                {jugador.nombreJugador}
                            </option>
                        ))}
                    </select>
                    {errors.idJugador && <span className='error'>{errors.idJugador.message}</span>}
                </div>
                <div className="form-container form-label">
                    <button className="form-button bg-success" type="submit">
                        Registrar
                    </button>
                    <button className="form-button bg-success" type="button" onClick={() => reset()}>
                        Limpiar
                    </button>
                    <button className="form-button bg-success"  onClick={onVolver}>
                      <i class="bi bi-arrow-left-square-fill"></i> Volver
                    </button>
                </div>
            </form>
        </div>
    );
}
