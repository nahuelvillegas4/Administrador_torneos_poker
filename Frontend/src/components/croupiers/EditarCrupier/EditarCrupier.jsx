import React, { useEffect, useState } from "react";
import croupierService from "../../../services/croupierService";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export const EditarCrupier = () => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm()
    const navigate = useNavigate()
    const [crupier, setCrupier] = useState()
    const {state} = useLocation()

    useEffect(() => {
        croupierService.getCrupierById(state.idCrupier).then(crupier => setCrupier(crupier))
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



    const onSubmit = (data) => {
        const crupier = {
            idCrupier: state.idCrupier,
        }
        if(data.nombre){
            crupier.nombre = data.nombre
        }else{
            crupier.nombre = state.nombre
        }

        if(data.edad){
            crupier.edad = data.edad
        }else{
            crupier.edad = state.edad
        }


        croupierService.putCrupier(crupier)
        navigate("/crupiers")
    }

    const onVolver = () => {
        navigate("/crupiers")
    }

    return (
        <div className="m-3">
            <h2>Modificar Crupier</h2>
            {crupier && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-container">
                        <label className="form-label" htmlFor="nombre">Nombre crupier:</label>
                        <input type="text" className="form-input" id="nombre" {...register("nombre")} defaultValue={crupier.nombre} />
                    </div>
                    <div className="form-container">
                        <label className="form-label" htmlFor="edad">Edad:</label>
                        <input type="date" className="form-input" id="edad" {...register("edad", {validate: validateEdad} )} defaultValue={crupier.edad} />
                        {errors.edad && <span className='error'>{errors.edad.message}</span>}
                    </div>
                    
                    <div className="form-container form-label div-crear">
                        <button className="button-crear" type="submit">
                            Modificar
                        </button>
                        <button className="button-crear" onClick={onVolver}>
                            Volver
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}