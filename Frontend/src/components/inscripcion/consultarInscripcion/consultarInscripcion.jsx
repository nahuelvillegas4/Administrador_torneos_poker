import { InscripcionesTable } from "../inscripcionTable/inscripcionTable";
import { Link } from "react-router-dom";

export const ListaInscripciones = () => {
  return (
    <div className="m-3">
      <h2 className="d-flex justify-content-between">
       <i class="bi bi-coin"> Listado de incripciones</i>
        <div>
          <Link to="/inscripciones/crear">
            <button className="btn bg-success">
              Crear Inscripción
            </button>
          </Link>
        </div>
      </h2>
      <hr />
      <InscripcionesTable />
    </div>
  );
};
