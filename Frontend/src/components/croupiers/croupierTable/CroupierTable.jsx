import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import croupierService from "../../../services/croupierService";

export const CroupierTable = () => {
    const { register, handleSubmit } = useForm();
    const [crupiers, setCrupiers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => { 
        loadCrupiers();
    }, []);

    const loadCrupiers = async () => {
        try {
            const data = await croupierService.getCrupiers();
            setCrupiers(data);
        } catch (error) {
            console.error("Error al cargar los crupiers:", error);
        }
    };

    const borrar = async (idCrupier) => {
        try {
            await croupierService.borrarCrupier(idCrupier);
            await loadCrupiers();
        } catch (error) {
            console.error("Error al borrar el crupier:", error);
            alert("ERROR AL BORRAR EL CRUPIER");
        }
    };

    const modificar = (idCrupier) => {
        navigate(`/crupiers/editar`, { state: { idCrupier: idCrupier } });
    };

    const filterSubmit = async (data) => {
        try {
            const crupiersFiltrados = await croupierService.getCrupiersFiltrados(data);
            setCrupiers(crupiersFiltrados);
        } catch (error) {
            console.error("Error consiguiendo los crupiers filtrados: ", error);
        }
    };

    // Función para formatear la fecha en formato YYYY-MM-DD
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    };

    return (
        <main className="container mt-3">
            <div>
                <form onSubmit={handleSubmit(filterSubmit)}>
                    <div className="form-group mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre del crupier</label>
                        <input type="text" id="nombre" name="nombre" className="form-control" {...register("nombre")} />
                    </div>
          <div className="d-flex justify-content-end">
            <button type="submit" style= {{width: "95px", height: "40px", fontSize: "14px"}}>
             <i class="bi bi-funnel"></i> Filtrar 
            </button>
          </div>
        </form>
      </div>
      <hr/>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-secondary">
          <tr>
            <th scope="col">id</th>
            <th scope="col">Nombre Crupier</th>
            <th scope="col">Edad</th>
            <th scope="col">Fecha Inicio Actividad</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {crupiers.map((crupier) => (
            <tr key={crupier.idCrupier}>
              <td>{crupier.idCrupier}</td>
              <td>{crupier.nombre}</td>
              <td>{Math.floor((new Date()/(1000 * 60 * 60 * 24 * 365.25))-(new Date(crupier.edad)/(1000 * 60 * 60 * 24 * 365.25))) + ' años'}</td>
              <td>{formatDate(crupier.fechaInicioActividadLaboral)}</td>
              <td >
                <button onClick={() => modificar(crupier.idCrupier)}>
                 <i className="bi bi-pencil-fill"></i> Modificar
                </button>
                <button  onClick={() => borrar(crupier.idCrupier)}>
                 <i class="bi bi-trash-fill"></i> Borrar
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
