import juegoArmadoService from "../../../services/juegoArmadoService";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const JuegoArmadoTable = () => {
    const {register, handleSubmit} = useForm()
    const [juegosArmados, setJuegoArmado] = useState([])

    useEffect(() => {
        juegoArmadoService
            .getJuegoArmado()
            .then((data) => setJuegoArmado(data))

    }, [])

    const filterSubmit = async (data) => {
      console.log("Datos del formulario:", data);
        try {
          const juegoArmadoFiltrado = await juegoArmadoService.getJuegoArmadoFiltrados(data)
          setJuegoArmado(juegoArmadoFiltrado)
  
        } catch (error) {
          console.error("error consiguiendo los juegos armados filtrados: ", error)
        }
    }
    return (
      <main className="container mt-3">
          <div>
              <form onSubmit={handleSubmit(filterSubmit)}>
                  <div className="form-group mb-3">
                      <label htmlFor="descripcion" className="form-label">Nombre del juego</label>
                      <input type="text" id="descripcion" name="descripcion" className="form-control" {...register("descripcion")} />
                  </div>
          
                  <div className="d-flex justify-content-end">
                   <button type="submit" className="btn bg-success">
                     <i class="bi bi-funnel"></i> Filtrar 
                   </button>
                  </div>
              </form>
          </div>
          <hr/>
          
          <table className="table table-bordered table-striped table-hover">
              <thead className="table-secondary">
                  <tr>
                      <th scope="col">Descripcion de juego</th>
                  </tr>
              </thead>
              <tbody>
                  {juegosArmados.map((juegoArmado) => (
                      <tr key={juegoArmado.idjuegoArmado}>
                          <td>{juegoArmado.descripcion}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </main>
  );
  
    }
