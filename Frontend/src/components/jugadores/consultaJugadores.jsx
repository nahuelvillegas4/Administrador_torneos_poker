import { JugadoresTable } from "./JugadorTable/JugadorTable";
import { Link } from "react-router-dom";

export const ListaJugadores = () => {
  return (
    <div className="m-3">
      <h2 className="d-flex justify-content-between">
      <i class="bi bi-coin"> Listado de Jugadores</i>

        <div>
          <Link to="/jugadores/crear">
            <button className="btn bg-success">
              Crear Jugador
              </button>
          </Link>
        </div>
      </h2>
      <hr />
      <JugadoresTable />
    </div>
  );
};
