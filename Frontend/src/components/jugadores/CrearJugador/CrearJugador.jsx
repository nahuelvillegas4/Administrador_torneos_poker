import React from "react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import mesasService from "../../../services/mesasService";
import jugadoresService from "../../../services/jugadoresService";
import { useNavigate } from "react-router-dom";


export default function RegistrarJugador() {

    const {register, handleSubmit, formState: {errors}} = useForm()
    const [mesas, setMesas] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        Promise.all([
            mesasService.getMesas(),
            
        ])
        .then(([mesasData]) => {
            setMesas(mesasData);
            
        })
    }, [])


    const validateEdad = (value) => {
        // Validación para edad entre 18 y 100 años
        const fecha_nac = new Date(value);
        const fecha_act = new Date()
        const edad = (((((fecha_act - fecha_nac)/1000)/3600)/24)/365)
        if (isNaN(edad) || edad < 18 || edad > 100) {
            return "Edad inválida: debe ser mayor a 18 años y menor a 100 años.";
        }
        return true;
    };

    

    const onSubmit = async(data) => {

        const fechaActual = new Date();
        const fechaSinHora = fechaActual.toISOString().split('T')[0];

        data.fechaActualizacionMesa = fechaSinHora
        await jugadoresService.postJugadores(data)
        .then(() => {
            navigate('/jugadores')
        })
        .catch((error) => {
            console.log('hola soy homero')
            console.error('Error al crear el jugador: ', error)
        })
    }

    const onVolver = () => {
        navigate('/jugadores')
    }

    return (
        <div>
            <form class="form-container" onSubmit={handleSubmit(onSubmit)}>
                <h3>Registrar Nuevo jugador</h3>
                <div className="form-container">
                    <label class="form-label" htmlFor="nombreJugador">Nombre Jugador:</label>
                    <input type="text" class="form-input" id="nombreJugador"  {...register("nombreJugador", { required: 'Este campo es requerido' })} />
                    {errors.nombreJugador && <span className='error'>{errors.nombreJugador.message}</span>}
                </div>
                <div className="form-container">
                    <label class="form-label" htmlFor="edadJugador">Fecha de nacimiento:</label>
                    <input type="date" class="form-input" id="edadJugador"  {...register("edadJugador", {validate: validateEdad}, { required: 'Este campo es requerido' })} />
                    {errors.edadJugador && <span className='error'>{errors.edadJugador.message}</span>}
                </div>
                <div className="form-container">
                    <label class="form-label" htmlFor="emailJugador">email Jugador:</label>
                    <input type="email" class="form-input" id="emailJugador"  {...register("emailJugador", { required: 'Este campo es requerido' })} />
                    {errors.emailJugador && <span className='error'>{errors.emailJugador.message}</span>}
                </div>
                <div className="form-container form-label">
                    <button className="form-button bg-success" type="submit">
                        Registrar
                    </button>
                    <button className="form-button bg-success" type="button" onClick={() => reset()}>
                        Limpiar
                    </button>
                    <button className="form-button bg-success"  onClick={onVolver}>
                       <i class="bi bi-arrow-left-square-fill"></i> Volver
                    </button>
                    </div>

            </form>
            
        </div >
    )

}