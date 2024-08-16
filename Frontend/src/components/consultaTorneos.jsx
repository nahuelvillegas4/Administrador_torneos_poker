import { TorneosTable } from "./tablaTorneos";
import { Link } from "react-router-dom";


export const ListaTorneos = () => {
    return (
      <div className="m-3">
        <h2 className="d-flex justify-content-between">
         <i class="bi bi-coin"> Listado de Torneos</i>
          <div>
            <Link to="/torneos/crear">
              <button >
                Crear Torneo
              </button>
            </Link>
          </div>
        </h2>
        <hr />
        <TorneosTable />
      </div>
    );
  };
  