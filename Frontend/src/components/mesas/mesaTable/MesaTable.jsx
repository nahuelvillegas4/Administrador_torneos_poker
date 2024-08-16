import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mesasService from "../../../services/mesasService";
import { useForm } from "react-hook-form";
import torneosService from "../../../services/torneosService";
import croupierService from "../../../services/croupierService";


export const MesaTable = () => {

    const {register, handleSubmit} = useForm()
    const [mesas, setMesas] = useState([])
    const[torneos, setTorneo] = useState([])
    const[crupiers, setCrupier] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        mesasService.getMesas().then((data) => setMesas(data));
        torneosService.getTorneos().then((data) => setTorneo(data))
        croupierService.getCrupiers().then((data) => setCrupier(data))
    }, [])

    const modificar = async (idMesa) => {
        navigate('/mesas/editar', {state: {idMesa: idMesa}})
    }

    function formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
    
      return `${year}/${month}/${day} ${hours}:${minutes}`;
    }

    const borrar = async(idMesa) => {
        try {
          await mesasService.borrarMesa(idMesa)

          const data = await mesasService.getMesas()
          setMesas(data)

        } catch (error) {

          alert("Error al borrar la mesa")
          
        }
    }

    const filterSubmit = async (data) => {
      try {

        const mesasFiltradas = await mesasService.getMesasFiltradas(data)
        setMesas(mesasFiltradas)

      } catch (error) {
        console.error("error consiguiendo las mesas filtradas: ", error)
      }
    }

    return (
    <main className="container mt-3">
      <div >
      <form onSubmit={handleSubmit(filterSubmit)}>
          <div className="form-group mb-3">
            <label htmlFor="idTorneo" className="form-label">Nombre del torneo</label>
            <select id="idTorneo" className="form-select" {...register("idTorneo")}>
              <option key="0" value="0">Todos</option>
              {torneos.map((torneo) => (
                <option key={torneo.idTorneo} value={torneo.idTorneo}>
                  {torneo.nombreTorneo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="idCrupier" className="form-label">Nombre del crupier</label>
            <select id='idCrupier' className="form-select" {...register("idCrupierMesa")}>
                        <option key="0" value="0">Seleccionar crupier</option>
                        {crupiers.map((crupier) => (
                            <option key={crupier.idCrupier} value={crupier.idCrupier}>
                                {crupier.nombre}
                            </option>
                        ))}
                    </select>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="nombre" className="form-label">Nombre de la mesa</label>
            <input type="text" id="nombreMesa" name="nombreMesa" className="form-control" {...register("nombreMesa")} />
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
            <th scope="col">id Mesa</th>
            <th scope="col">Nombre Torneo</th>
            <th scope="col">Fecha Creacion</th>
            <th scope="col">Fecha Actualizacion</th>
            <th scope="col">Crupier</th>
            <th scope="col">Nombre Mesa</th>
            <th scope="col">Jugadores Actuales</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mesas.map((mesa) => (
            console.log(mesa),
            <tr key={mesa.idMesa}>
              <td>{mesa.idMesa}</td>
              <td>{mesa.torneo.nombreTorneo}</td>
              <td>{mesa.fechaCreacionMesa}</td>
              <td>{formatTimestamp(mesa.fechaActualizacionMesa)}</td>
              <td>{mesa.crupier.nombre}</td>
              <td>{mesa.nombreMesa}</td>
              <td>{mesa.cantidadJugadores == null? 0 : mesa.cantidadJugadores}</td>
              <td className="text-center">
                <div className="d-flex justify-content-center align-items-center">
                <button onClick={() => modificar(mesa.idMesa)}>
                 <i className="bi bi-pencil-fill"></i> ‎  Modificar
                </button>
                <button  onClick={() => borrar(mesa.idMesa)}>
                 <i class="bi bi-trash-fill"></i> Borrar
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </main>
  );
}
