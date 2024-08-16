import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import inscripcionService from "../../../services/inscripcionService";
import torneosService from "../../../services/torneosService";
import jugadoresService from "../../../services/jugadoresService";
import mesasService from "../../../services/mesasService";

export const InscripcionesTable = () => {
  const { register, handleSubmit } = useForm();
  const [inscripciones, setInscripciones] = useState([]);
  const [torneos, setTorneos] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [mesas, setMesas] = useState([]);
  const [mesasFiltradas, setMesasFiltradas] = useState([])

  useEffect(() => {
    Promise.all([
      torneosService.getTorneos(),
      jugadoresService.getJugadores(),
      mesasService.getMesas(),
      inscripcionService.getInscripciones()
    ]).then(([torneosData, jugadoresData, mesasData, inscripcionesData]) => {
      setTorneos(torneosData);
      setJugadores(jugadoresData);
      setMesas(mesasData);
      setInscripciones(inscripcionesData);
    }).catch(error => {
      console.error("Error al obtener datos: ", error);
    });
  }, []);

  const borrar = async (idInscripcion) => {
    try {
      await inscripcionService.borrarInscripcion(idInscripcion);
      const data = await inscripcionService.getInscripciones();
      setInscripciones(data);
    } catch (err) {
      alert("ERROR AL BORRAR INSCRIPCIÓN");
    }
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filterSubmit = async (data) => {
    try {
      const inscripcionesFiltradas = await inscripcionService.getInscripcionesFiltradas(data);
      setInscripciones(inscripcionesFiltradas);
    } catch (error) {
      console.error("Error al filtrar inscripciones: ", error);
    }
  };

  const handleTorneoChange = async (event) => {
    const torneoId = event.target.value
    const selectedTorneoId = event.target.value
    const data = {}
    if (selectedTorneoId){
      data.idTorneo = selectedTorneoId
      const mesasFiltradas = await mesasService.getMesasFiltradas(data)
      setMesasFiltradas(mesasFiltradas)
    } else {
      setMesasFiltradas([])
    }
  }

  return (
    <main className="container mt-3">
      <div>
        <form onSubmit={handleSubmit(filterSubmit)}>
          <div className="mb-3">
            <label htmlFor="idTorneo" className="form-label">Torneo</label>
            <select id="idTorneo" className="form-select" {...register("idTorneo")} onChange={handleTorneoChange}>
              <option key="0" value="0">Todos</option>
              {torneos.map((torneo) => (
                <option key={torneo.idTorneo} value={torneo.idTorneo}>
                  {torneo.nombreTorneo}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="idMesa" className="form-label">Mesa</label>
            <select id="idMesa" className="form-select" {...register("idMesa")}>
              <option key="0" value='0' >Todas</option>
              {mesasFiltradas.map((mesa) => (
                <option key={mesa.idMesa} value={mesa.idMesa}>
                  {mesa.nombreMesa}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-end">
          <button type="submit" className="btn bg-success">
            <i class="bi bi-funnel"></i> Filtrar 
            </button>
          </div>
        </form>
      </div>
      <hr />
      <table className="table table-bordered">
        <thead className="table-secondary">
          <tr>
            <th scope="col">Torneo</th>
            <th scope="col">Jugador</th>
            <th scope="col">Mesa</th>
            <th scope="col">Fecha Creación</th>
            <th scope="col">Fecha Actualización</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map((inscripcion) => (
            <tr key={inscripcion.idInscripcion}>
              <td>{inscripcion.idTorneo ? inscripcion.torneo.nombreTorneo : 'No asignado'}</td>
              <td>{inscripcion.jugador ? inscripcion.jugador.nombreJugador : 'No asignado'}</td>
              <td>{inscripcion.mesa ? inscripcion.mesa.nombreMesa : 'No asignado'}</td>
              <td>{formatFecha(inscripcion.fechaCreacionInscripcion)}</td>
              <td>{formatFecha(inscripcion.fechaActualizacionInscripcion)}</td>
              <td>
                <button className='btn btn-danger' onClick={() => borrar(inscripcion.idTorneo, inscripcion.idJugador, inscripcion.idMesa)}>Eliminar Inscripción</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
