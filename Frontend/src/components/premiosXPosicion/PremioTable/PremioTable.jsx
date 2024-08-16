import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import torneosService from "../../../services/torneosService";
import premiosService from "../../../services/premiosService";

const posiciones = [...Array(10).keys()].map((pos) => pos + 1); // Genera un array del 1 al 10

const divisas = [
    "Dolar",
    "Euro",
    "Yen japonés",
    "Libra esterlina",
    "Peso argentino",
    "MomoCoin",
    "EteSechCoin"
];

const formatearFecha = (fecha) => {
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getUTCDate();
    const mes = meses[fechaObj.getUTCMonth()];
    const año = fechaObj.getUTCFullYear();
    const horas = fechaObj.getUTCHours().toString().padStart(2, '0');
    const minutos = fechaObj.getUTCMinutes().toString().padStart(2, '0');
  
    return `${dia} de ${mes} del ${año} ${horas}:${minutos}`;
  };

export const PremiosTable = () => {
    const { register, handleSubmit } = useForm();
    const [premios, setPremios] = useState([]);
    const [torneos, setTorneos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [torneosData, premiosData] = await Promise.all([
                    torneosService.getTorneos(),
                    premiosService.getPremios()
                ]);

                const premiosConNombreTorneo = premiosData.map((premio) => {
                    const torneo = torneosData.find(t => t.idTorneo === premio.idTorneo);
                    return {
                        ...premio,
                        nombreTorneo: torneo ? torneo.nombreTorneo : 'Sin Torneo'
                    };
                });

                setTorneos(torneosData);
                setPremios(premiosConNombreTorneo);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        fetchInitialData();
    }, []);

    const modificar = (numeroPosicion, idTorneo) => {
        navigate('/premios/editar', { state: { numeroPosicion, idTorneo } });
    };

    const borrar = async (numeroPosicion, idTorneo) => {
        try {
            await premiosService.borrarPremio(numeroPosicion, idTorneo);
            const premiosActualizados = premios.filter(premio => premio.numeroPosicion !== numeroPosicion || premio.idTorneo !== idTorneo);
            setPremios(premiosActualizados);
        } catch (error) {
            console.error("Error al borrar el premio:", error);
            alert("Error al borrar el premio");
        }
    };

    const filterSubmit = async (data) => {
        try {
            const premiosFiltrados = await premiosService.getPremiosFiltrados(data);
            const premiosConNombreTorneo = premiosFiltrados.map((premio) => {
                const torneo = torneos.find(t => t.idTorneo === premio.idTorneo);
                return {
                    ...premio,
                    nombreTorneo: torneo ? torneo.nombreTorneo : 'Sin Torneo'
                };
            });
            setPremios(premiosConNombreTorneo);
        } catch (error) {
            console.error("Error al obtener los premios filtrados:", error);
        }
    };

    return (
        <main className="container mt-3">
            <div>
                <form onSubmit={handleSubmit(filterSubmit)}>
                    <div className="form-group mb-3">
                        <label htmlFor="numeroPosicion" className="form-label">Número de Posición</label>
                        <select id="numeroPosicion" className="form-select" {...register("numeroPosicion")}>
                            <option value="">Todos</option>
                            {posiciones.map((posicion) => (
                                <option key={posicion} value={posicion}>{posicion}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="idTorneo" className="form-label">Torneo</label>
                        <select id="idTorneo" className="form-select" {...register("idTorneo")}>
                            <option value="">Todos los Torneos</option>
                            {torneos.map((torneo) => (
                                <option key={torneo.idTorneo} value={torneo.idTorneo}>{torneo.nombreTorneo}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="divisa" className="form-label">Divisa</label>
                        <select id="divisa" className="form-select" {...register("divisa")}>
                            <option value="">Todas las Divisas</option>
                            {divisas.map((divisa) => (
                                <option key={divisa} value={divisa}>{divisa}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn bg-success">
                     <i class="bi bi-funnel"></i> Filtrar 
                    </button>
                    
                </form>
            </div>
            <hr />
            <table className="table table-bordered table-striped table-hover">
                <thead className="table-secondary">
                    <tr>
                        <th scope="col">Número de Posición</th>
                        <th scope="col">Torneo</th>
                        <th scope="col">Premio</th>
                        <th scope="col">Divisa</th>
                        <th scope="col">Fecha de Creación</th>
                        <th scope="col">Fecha de Actualización</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {premios.map((premio) => (
                        <tr key={`${premio.numeroPosicion}-${premio.idTorneo}`}>
                            <td>{premio.numeroPosicion}</td>
                            <td>{premio.nombreTorneo}</td>
                            <td>{premio.premio}</td>
                            <td>{premio.divisa}</td>
                            <td>{formatearFecha(premio.fechaCreacionPremio)}</td>
                            <td>{formatearFecha(premio.fechaActualizacionPremio)}</td>
                            <td>
                                <button className="btn btn-success me-2" onClick={() => modificar(premio.numeroPosicion, premio.idTorneo)}>
                                 <i className="bi bi-pencil-fill"></i> Modificar
                                </button>
                                <button className="btn btn-danger" onClick={() => borrar(premio.numeroPosicion, premio.idTorneo)}>
                                 <i class="bi bi-trash-fill"></i> Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default PremiosTable;
