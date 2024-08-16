import { Link } from "react-router-dom";
import { MesaTable } from "./mesaTable/MesaTable";


export const ListaMesas = () => {
    return (
      <div className="m-3">
        <h2 className="d-flex justify-content-between">
         <i class="bi bi-coin"> Listado de Mesas</i>
          <div>
            <Link to="/mesas/crear">
              <button>
                Crear Mesa
                </button>
            </Link>
          </div>
        </h2>
        <hr />
        <MesaTable />
      </div>
    );
  };