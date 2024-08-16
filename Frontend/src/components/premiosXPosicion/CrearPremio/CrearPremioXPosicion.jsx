import React, { useEffect, useState } from "react";
import premiosService from "../../../services/premiosService";
import torneosService from "../../../services/torneosService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const RegistrarPremio = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [torneos, setTorneos] = useState([]);
    const navigate = useNavigate();

    const divisas = [
        "Dolar",
        "Euro",
        "Yen japonés",
        "Libra esterlina",
        "Peso argentino",
        "MomoCoin",
        "EteSechCoin"
    ];

    useEffect(() => {
        torneosService.getTorneos()
            .then((torneosData) => {
                setTorneos(torneosData);
            })
            .catch((error) => {
                console.error("Error al obtener los torneos:", error);
            });
    }, []);

    const onSubmit = async (data) => {
        try {
            // Verificar si la posición del premio está en uso
            const posicionEnUso = await premiosService.verificarPosicionEnUso(data.numeroPosicion, data.idTorneo);

            if (posicionEnUso) {
                alert("La posición del premio ya está en uso. Por favor, elija otra posición.");
            } else {
                const nuevoPremio = {
                    numeroPosicion: data.numeroPosicion,
                    idTorneo: data.idTorneo,
                    premio: data.premio,
                    divisa: data.divisa
                };

                await premiosService.postPremio(nuevoPremio);
                navigate('/premios');
            }
        } catch (error) {
            console.error("Error al crear el premio:", error);
            // Manejar el error según corresponda
        }
    };

    const onVolver = () => {
        navigate('/premios');
    };

    return (
        <div className="m-3">
            <h2>Crear Premio</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-container">
                    <label className="form-label" htmlFor="numeroPosicion">Número de Posición:</label>
                    <input
                        type="number"
                        className="form-input"
                        id="numeroPosicion"
                        {...register("numeroPosicion", {
                            required: 'Este campo es requerido',
                            min: { value: 1, message: 'El valor debe ser mayor que 0' }
                        })}
                    />
                    {errors.numeroPosicion && <span className='error'>{errors.numeroPosicion.message}</span>}
                </div>
                <div className="form-container">
                    <label className="form-label" htmlFor="idTorneo">Torneo:</label>
                    <select id='idTorneo' {...register("idTorneo")}>
                        <option value="">Seleccionar Torneo</option>
                        {torneos.map((torneo) => (
                            <option key={torneo.idTorneo} value={torneo.idTorneo}>
                                {torneo.nombreTorneo}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-container">
                    <label className="form-label" htmlFor="premio">Premio:</label>
                    <input
                        type="number"
                        className="form-input"
                        id="premio"
                        {...register("premio", {
                            required: 'Este campo es requerido',
                            min: { value: 1, message: 'El valor debe ser mayor que 0' }
                        })}
                    />
                    {errors.premio && <span className='error'>{errors.premio.message}</span>}
                </div>
                <div className="form-container">
                    <label className="form-label" htmlFor="divisa">Divisa:</label>
                    <select id='divisa' {...register("divisa")}>
                        <option value="">Seleccionar Divisa</option>
                        {divisas.map((divisa, index) => (
                            <option key={index} value={divisa}>
                                {divisa}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-container form-label">
                    <button className="form-button bg-success" type="submit">Crear Premio</button>
                    <button className="form-button bg-success" type="button" onClick={() => reset()}>Limpiar</button>
                    <button className="form-button bg-success"  onClick={onVolver}>
                      <i class="bi bi-arrow-left-square-fill"></i> Volver
                    </button>
                </div>
            </form>
        </div>
    );
};
