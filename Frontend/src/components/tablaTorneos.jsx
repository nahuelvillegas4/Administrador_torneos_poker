import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import baseService from "../services/baseService";
import torneosService from "../services/torneosService";

import { useNavigate } from "react-router-dom";

import '../index.css';

const formatearFecha = (fecha) => {
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const fechaObj = new Date(fecha);
  const opciones = { timeZone: 'America/Argentina/Buenos_Aires', hour12: false };

  const dia = fechaObj.toLocaleString('es-AR', { ...opciones, day: '2-digit' });
  const mes = meses[fechaObj.toLocaleString('es-AR', { ...opciones, month: 'numeric' }) - 1];
  const año = fechaObj.toLocaleString('es-AR', { ...opciones, year: 'numeric' });
  const horas = fechaObj.toLocaleString('es-AR', { ...opciones, hour: '2-digit' });
  const minutos = fechaObj.toLocaleString('es-AR', { ...opciones, minute: '2-digit' });

  return `${dia} de ${mes} del ${año} ${horas}:${minutos}`;
};

export const TorneosTable = () => {
  const { register, handleSubmit } = useForm();
  const [torneos, setTorneos] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {

      torneosService
        .getTorneos()
        .then((data) => setTorneos(data));
    
  }, []);

// LO SIGUIENTE ES PARA EL DELETE
  const borrar = async (idTorneo) => {
    try {
    await torneosService.borrarTorneo(idTorneo);

    // ahora refresco el front para que impacten los cambios
    const data = await torneosService.getTorneos();
    setTorneos(data);
    // lo de abajo es lo mismo que lo de arriba
    }catch(err) {
      alert("ERROR AL BORRAR EL TORNEO")}


  }


  const modificar = async (idTorneo) => {

    navigate(`/torneos/editar`, { state: { idTorneo: idTorneo } });

  }

  const filterSubmit = async (data) => {
    try {
      const torneosFiltrados = await torneosService.getTorneosFiltrados(data)
      setTorneos(torneosFiltrados);
    } 
    catch (error) {
      console.error("Error fetching filtered torneos:", error);
    }
  };

  return (
    <main className="container mt-3">
      <div>
        <form onSubmit={handleSubmit(filterSubmit)}>
          <div className="form-group mb-3">
            <label htmlFor="nombreTorneo" className="form-label">Nombre del torneo</label>
            <input type="text" id="nombreTorneo" name="nombreTorneo" className="form-control" {...register("nombreTorneo")} />
          </div>

         
          <div className="form-group mb-3">
            <label htmlFor="locacionTorneo" className="form-label">locacion del torneo</label>
            <input type="text" id="locacionTorneo" name="locacionTorneo" className="form-control" {...register("locacionTorneo")} />
          </div>

        
          <div className="form-group mb-4">
            <input className="form-check-input custom-checkbox" type="checkbox" id="enJuego" {...register("enJuego")} />
            <label className="form-check-label" htmlFor="enJuego">&nbsp;Solo torneos que esten en juego</label>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" style= {{width: "95px", height: "40px", fontSize: "14px"}}>
             <i class="bi bi-funnel"></i> Filtrar 
            </button>
          </div>
        </form>
      </div>
      <hr/>

      <div className="table-responsive">
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-secondary">
          <tr>
            <th scope="col">id</th>
            <th scope="col">Nombre Torneo</th>
            <th scope="col">Fecha Inicio Torneo</th>
            <th scope="col">Fecha Fin Torneo</th>
            <th scope="col">Locacion de torneo</th>
            <th scope="col">Fondo de premios torneo</th>
            
            <th scope="col">En Juego</th>
            <th scope="col">Acciones</th>
            
          </tr>
        </thead>
        <tbody>
          {torneos.map((torneo) => (
            <tr key={torneo.idTorneo}>
              <td>{torneo.idTorneo}</td>
              <td>{torneo.nombreTorneo}</td>
              <td>{formatearFecha(torneo.fechaInicioTorneo)}</td>
              <td>{formatearFecha(torneo.fechaFinTorneo)}</td>
              <td>{torneo.locacionTorneo}</td>
              <td>{torneo.fondoDePremiosTorneo}</td>
              
              <td>{torneo.enJuego == 1 ? "Si" : "No"}</td>
              <td>
                <button onClick={() => modificar(torneo.idTorneo)}>
                  <i className="bi bi-pencil-fill"></i> ‎  Modificar
                </button>
                <button className="btn-danger" onClick={() => borrar(torneo.idTorneo)}>
                  <i></i> Jugar / Finalizar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </main>
  );
};
