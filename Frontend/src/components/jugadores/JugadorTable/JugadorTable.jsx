import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import jugadoresService from "../../../services/jugadoresService";
import mesasService from "../../../services/mesasService";

export const JugadoresTable = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [jugadores, setJugadores] = useState([]);
  const [mesas, setMesas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    mesasService.getMesas().then((data) => setMesas(data));
    jugadoresService.getJugadores().then((data) => setJugadores(data));
  }, []);

  const borrar = async (idJugador) => {
    try {
      await jugadoresService.borrarJugador(idJugador);
      const data = await jugadoresService.getJugadores();
      setJugadores(data);
    } catch (err) {
      alert("ERROR AL BORRAR jugador");
    }
  };

  const modificar = async (idJugador) => {
    navigate(`/jugadores/editar`, { state: { idJugador: idJugador } });
  };

  const filterSubmit = async (data) => {
    try {
      const jugadoresFiltrados = await jugadoresService.getJugadoresFiltrados(data);
      setJugadores(jugadoresFiltrados);
    } catch (error) {
      console.error("Error fetching filtered jugadores DX :", error);
    }
  };

  return (
    <main className="container mt-3">
      <div>
        <form onSubmit={handleSubmit(filterSubmit)}>
          <div className="form-group mb-3">
            <label htmlFor="idJugador" className="form-label">id Jugador</label>
            <input type="number" id="idJugador" name="idJugador" className="form-control" {...register("idJugador", {min: { value: 1, message: "Debe ingresar un número positivo" }})} />
            {errors.idJugador && <span className='error'>{errors.idJugador.message}</span>}

          </div>
          <div className="mb-3">
            <label htmlFor="nombreJugador" className="form-label">Nombre Jugador: </label>
            <input type="text" name="nombreJugador" id="nombreJugador" className="form-control" {...register("nombreJugador")} />
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
            <th scope="col">id Jugador</th>
            <th scope="col">Nombre Jugador</th>
            <th scope="col">Edad Jugador</th>
            <th scope="col">email Jugador</th>
            <th scope="col">fecha ingreso Jugador</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {jugadores.map((jugador) => (
            console.log(jugador),
            <tr key={jugador.idJugador}>
              <td>{jugador.idJugador}</td>
              <td>{jugador.nombreJugador}</td>
              <td>{Math.floor((new Date()/(1000 * 60 * 60 * 24 * 365.25))-(new Date(jugador.edadJugador)/(1000 * 60 * 60 * 24 * 365.25))) + ' años'}</td>
              <td>{jugador.emailJugador}</td>
              <td>{jugador.fechaCreacionJugador}</td>
              <td>
                <button className='btn btn-success me-2' onClick={() => { modificar(jugador.idJugador) }}>
                 <i className="bi bi-pencil-fill"></i> Modificar
                </button>
                <button className='btn btn-danger' onClick={() => { borrar(jugador.idJugador) }}>
                 <i class="bi bi-trash-fill"></i> Eliminar 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
