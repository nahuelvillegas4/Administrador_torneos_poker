import React, { useState } from 'react'
//import './styles.css'
import {TorneosTable} from './tablaTorneos' // lo importo asi porque el componente esta `export default `
import service from "../services/torneosService"
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"


// funcion para darle formato a la fecha y hora (en el form el tipo de dato es datetime-local)


export default function RegistroTorneo() {
    const [rows, setRows] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate();

    const onSubmit = async (data) => {

                // Validar que la fecha de inicio sea menor o igual que la fecha de fin
        if (new Date(data.fechaInicioTorneo) > new Date(data.fechaFinTorneo)) {
            alert ("La fecha de inicio de fin debe ser mayor o igual que la fecha fin de inicio");
            setError('fechaFinTorneo', {
                type: 'manual',
                message: 'La fecha de fin debe ser mayor o igual que la fecha de inicio'
            });
            return
        }


        await service.postTorneo(data)
        .then(() => {
            navigate('/torneos'); // Redireccionar a /reservas después de enviar el formulario
        })
        .catch((error) => {
            console.error("Error al crear el Torneo:", error);
            
        });
    }


    

    const onVolver = () => {
        navigate("/torneos");
    }

    return (
        <div>
            <form class="form-container" onSubmit={handleSubmit(onSubmit)}>
                <h3>Registrar Nuevo Torneo</h3>
                <div className="form-container">
                    <label class="form-label" htmlFor="nombreTorneo">Nombre Torneo:</label>
                    <input type="text" class="form-input" id="nombreTorneo"  {...register("nombreTorneo", { required: 'Este campo es requerido' })} />
                    {errors.nombreTorneo && <span className='error'>{errors.nombreTorneo.message}</span>}
                </div>
                <div className="form-container">
                    <label class="form-label" htmlFor="fechaInicioTorneo">fecha Inicio Torneo:</label>
                    <input type="datetime-local" class="form-input" id="fechaInicioTorneo" {...register("fechaInicioTorneo", { required: 'Este campo es requerido' })} />
                    {errors.fechaInicioTorneo && <span className='error'>{errors.fechaInicioTorneo.message}</span>}
                </div>
                <div className="form-container">
                    <label class="form-label" htmlFor="fechaFinTorneo">fecha Fin Torneo:</label>
                    <input type="datetime-local" class="form-input" id="fechaFinTorneo" {...register("fechaFinTorneo", { required: 'Este campo es requerido' })} />
                    {errors.fechaFinTorneo && <span className='error'>{errors.fechaFinTorneo.message}</span>}
                </div>
                <div className="form-container">
                    <label class="form-label" htmlFor="locacionTorneo">Locacion Torneo:</label>
                    <input type="text" class="form-input" id="locacionTorneo"  {...register("locacionTorneo", { required: 'Este campo es requerido' })} />
                    {errors.locacionTorneo && <span className='error'>{errors.locacionTorneo.message}</span>}
                </div>
                <div className="form-container">
                    <label class="form-label" htmlFor="fondoDePremiosTorneo">fondo De Premios Torneo:</label>
                    <input type="number" class="form-input" id="fondoDePremiosTorneo" {...register("fondoDePremiosTorneo", { required: 'Este campo es requerido', min: { value: 1, message: 'El valor debe ser mayor que 0' }  })} />
                    {errors.fondoDePremiosTorneo && <span className='error'>{errors.fondoDePremiosTorneo.message}</span>}
                </div>
        <div className="form-container form-label div-crear">
          <button type="submit" className="button-crear">
            Registrar
          </button>
          <button type="reset" className="button-crear" onClick={() => reset()}>
            Limpiar
          </button>
          <button className="button-crear" onClick={onVolver}>
           <i class="bi bi-arrow-left-square-fill"></i> Volver
          </button>
        </div>

                
            </form>
            
        </div >
    )
}
