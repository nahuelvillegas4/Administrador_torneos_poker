import { Link } from "react-router-dom";
import { PremiosTable } from "./PremioTable/PremioTable";

export const ListaPremios = () => {
  return (
    <div className="m-3">
      <h2 className="d-flex justify-content-between">
       <i class="bi bi-coin"> Listado de premios</i>
        <div>
          <Link to="/premios/crear">
            <button className="btn bg-success">Crear Premio</button>
          </Link>
        </div>
      </h2>
      <hr />
      <PremiosTable />
    </div>
  );
};