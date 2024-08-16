import { JuegoArmadoTable } from "./juegoArmadoTable/juegoArmadoTable";

export const ListaJuegoArmado = () => {
  return (
    <div className="m-3">
      <h2 className="d-flex justify-content-between">
       <i class="bi bi-coin"> Listado de juegos armados</i>
      </h2>
      <hr />
      <JuegoArmadoTable />
    </div>
  );
};