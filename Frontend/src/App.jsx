import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";

// navbar
import {Navbar} from "./components/navbar/navbar";

// torneos
import { ListaTorneos } from './components/consultaTorneos';
import RegistroTorneo from './components/crearTorneos';
import { EditarTorneos } from './components/editarTorneos';

// inicio
import { Inicio } from './components/inicio/Inicio';

// estilo
import './App.css'

// crupiers
import { ListaCrupiers } from './components/croupiers/consultaCroupier';
import RegistrarCrupier from './components/croupiers/CrearCrupier/CrearCrupier';
import { EditarCrupier } from './components/croupiers/EditarCrupier/EditarCrupier';

// Mesas
import { ListaMesas } from './components/mesas/consultaMesas';
import { MesaTable } from './components/mesas/mesaTable/MesaTable';
import RegistrarMesa from './components/mesas/CrearMesa/CrearMesa';
import { Editarmesa } from './components/mesas/EditarMesa/EditarMesa';

// Jugadores
import  {ListaJugadores}  from './components/jugadores/consultaJugadores';
import RegistrarJugador from './components/jugadores/CrearJugador/CrearJugador';
import { EditarJugador } from './components/jugadores/EditarJugador/EditarJugador';

import  {ListaJuegoArmado}  from './components/juegoArmado/consultaJuegoArmado';

// inscripcion
import RegistrarInscripcion from './components/inscripcion/crearIncripcion/crearInscripcion';
import EditarInscripcion from './components/inscripcion/modificarIncripcion/modificarInscripcion';
import { ListaInscripciones } from './components/inscripcion/consultarInscripcion/consultarInscripcion';
import { ListaPremios } from './components/premiosXPosicion/consultaPremio';

import  {RegistrarPremio}  from './components/premiosXPosicion/CrearPremio/CrearPremioXPosicion';

import { EditarPremio } from './components/premiosXPosicion/EditarPremio/EditarPremio';


function App() {
  

  return (
    <>
      <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div class = "tablas">
          <Routes>
            <Route path="/" element={<Inicio/>} />
            <Route path="/torneos" element={<ListaTorneos/>} />
            <Route path="/torneos/crear" element={<RegistroTorneo/>} />
            <Route path="/torneos/editar" element={<EditarTorneos/>} />
            <Route path='/crupiers' element={<ListaCrupiers/>}/>
            <Route path='/crupiers/crear' element={<RegistrarCrupier/>}/>
            <Route path='/crupiers/editar' element={<EditarCrupier/>}/>
            <Route path='/mesas' element={<ListaMesas/>}/>
            <Route path='/mesas/crear' element={<RegistrarMesa/>}/>
            <Route path='/mesas/editar' element={<Editarmesa/>}/>
            <Route path='/jugadores' element={<ListaJugadores/>}/>
            <Route path='/jugadores/crear' element={<RegistrarJugador/>}/>
            <Route path='/jugadores/editar' element={<EditarJugador/>}/>
            <Route path='/juegoarmado' element={<ListaJuegoArmado/>}/>
            <Route path="/inscripcion" element={<ListaInscripciones />} />
            <Route path="/inscripciones/crear" element={<RegistrarInscripcion />} />
            <Route path="/inscripciones/editar" element={<EditarInscripcion />} />

            <Route path='/premios' element={<ListaPremios/>}/>
            <Route path='/premios/crear' element={<RegistrarPremio/>}/>
            <Route path='/premios/editar' element={<EditarPremio/>}/>
          
          </Routes>
          </div>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App;
