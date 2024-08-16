import React from "react";
import derimagen from "./DER.png"
import "../../index.css"
export const Inicio = () => {
    return (
        <div className="contenedor-div-imagen">
            <img src = {derimagen}  alt="imagen de base de datos" className="imagen" />
        </div>
    )
}

