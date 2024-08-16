import React from "react";
import croupierService from "../../../services/croupierService";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function RegistrarCrupier() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await croupierService.postCrupier(data)
            .then(() => {
                navigate('/crupiers');
            })
            .catch((error) => {
                console.error("Error al crear el Crupier:", error);
            });
    };

    const onVolver = () => {
        navigate("/crupiers");
    };

    const validateNombre = (value) => {
        // Validación para caracteres alfabéticos y máximo 50 caracteres
        if (!/^[A-Za-z ]{1,50}$/.test(value)) {
            return "Nombre inválido: solo se permiten caracteres alfabéticos y máximo 50 caracteres.";
        }
        return true;
    };

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

    const validateFechaInicioActividad = (value) => {
        // Validación para fecha de inicio de actividad anterior o igual a la fecha actual
        const fechaActual = new Date();
        const fechaInicio = new Date(value);
        if (fechaInicio > fechaActual) {
            return "Fecha inválida: la fecha de inicio no puede ser futura.";
        }
        return true;
    };

    return (
        <div>
            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                <h3>Registrar Nuevo Crupier</h3>
                <div className="form-container">
                    <label className="form-label" htmlFor="nombre">Nombre Crupier:</label>
                    <input
                        type="text"
                        className="form-input"
                        id="nombre"
                        {...register("nombre", {
                            required: "Este campo es requerido",
                            validate: validateNombre
                        })}
                    />
                    {errors.nombre && <span className='error'>{errors.nombre.message}</span>}
                </div>
                <div className="form-container">
                    <label className="form-label" htmlFor="edad">Fecha de nacimiento:</label>
                    <input
                        type="date"
                        className="form-input"
                        id="edad"
                        {...register("edad", {
                            required: "Este campo es requerido",
                            validate: validateEdad
                        })}
                    />
                    {errors.edad && <span className='error'>{errors.edad.message}</span>}
                </div>
                <div className="form-container form-label div-crear">
                    <button className="button-crear" type="submit">
                        Registrar
                    </button>
                    <button className="button-crear" type="button" onClick={() => reset()}>
                        Limpiar
                    </button>
                    <button className="button-crear"  onClick={onVolver}>
                     <i class="bi bi-arrow-left-square-fill"></i> Volver
                    </button>
                </div>
            </form>
        </div>
    );
}
