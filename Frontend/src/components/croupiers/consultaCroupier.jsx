import { CroupierTable } from "./croupierTable/CroupierTable";
import { Link } from "react-router-dom";


export const ListaCrupiers = () => {
    return (
      <div className="m-3">
        <h2 className="d-flex justify-content-between">
        <i class="bi bi-coin"> Listado de Croupiers</i>
          <div>
            <Link to="/crupiers/crear">
              <button>
                Crear Croupier
                </button>
            </Link>
          </div>
        </h2>
        <hr />
        <CroupierTable />
      </div>
    );
  };