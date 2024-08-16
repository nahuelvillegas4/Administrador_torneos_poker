import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import inscripcionService from "../../../services/inscripcionService";
import torneosService from "../../../services/torneosService";
import jugadoresService from "../../../services/jugadoresService";
import mesasService from "../../../services/mesasService";

export default function EditarInscripcion() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [torneos, setTorneos] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [inscripcion, setInscripcion] = useState();
  const { state } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener los datos necesarios para el formulario de edición
        const [
          torneosData,
          jugadoresData,
          mesasData,
          inscripcionData
        ] = await Promise.all([
          torneosService.getTorneos(),
          jugadoresService.getJugadores(),
          mesasService.getMesas(),
          inscripcionService.getInscripcionByKeys(state.idTorneo, state.idJugador, state.idMesa) // Ajusta el método de servicio según tu backend
        ]);

        setTorneos(torneosData);
        setJugadores(jugadoresData);
        setMesas(mesasData);
        setInscripcion(inscripcionData); // Establece los datos de la inscripción para el formulario
      } catch (error) {
        console.error("Error al obtener datos de inscripción: ", error);
      }
    };

    fetchData();
  }, [state.idTorneo, state.idJugador, state.idMesa]);

  const onSubmit = (data) => {
    const fechaActual = new Date().toISOString().split('T')[0];
    const updatedInscripcion = {
      idTorneo: state.idTorneo,
      idJugador: state.idJugador,
      idMesa: state.idMesa,
      ...data,
      fechaActualizacionInscripcion: fechaActual
    };

    inscripcionService.putInscripcion(updatedInscripcion)
      .then(() => {
        navigate('/inscripcion');
      })
      .catch((error) => {
        console.error('Error al actualizar la inscripción: ', error);
      });
  };

  const onVolver = () => {
    navigate("/inscripcion");
  };

  return (
    <div className="m-3">
      <h2>Modificar Inscripción</h2>
      {inscripcion && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-container">
            <label className="form-label" htmlFor="idTorneo">Torneo:</label>
            <select id="idTorneo" defaultValue={inscripcion.idTorneo} {...register("idTorneo", { required: 'Este campo es requerido' })}>
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
            <label className="form-label" htmlFor="idJugador">Jugador:</label>
            <select id="idJugador" defaultValue={inscripcion.idJugador} {...register("idJugador", { required: 'Este campo es requerido' })}>
              <option value="">Seleccionar Jugador</option>
              {jugadores.map((jugador) => (
                <option key={jugador.idJugador} value={jugador.idJugador}>
                  {jugador.nombreJugador}
                </option>
              ))}
            </select>
            {errors.idJugador && <span className='error'>{errors.idJugador.message}</span>}
          </div>
          <div className="form-container">
            <label className="form-label" htmlFor="idMesa">Mesa:</label>
            <select id="idMesa" defaultValue={inscripcion.idMesa} {...register("idMesa", { required: 'Este campo es requerido' })}>
              <option value="">Seleccionar Mesa</option>
              {mesas.map((mesa) => (
                <option key={mesa.idMesa} value={mesa.idMesa}>
                  {mesa.nombreMesa}
                </option>
              ))}
            </select>
            {errors.idMesa && <span className='error'>{errors.idMesa.message}</span>}
          </div>
          <div className="form-container form-label">
            <button className="form-button bg-success" type="submit">Modificar Inscripción</button>
            <button className="form-button bg-success" type="button" onClick={() => reset()}>Limpiar</button>
            <button className="form-button bg-success" onClick={onVolver}>Volver</button>
          </div>
        </form>
      )}
    </div>
  );
};
