import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Dashboard =() =>{

  const navigate = useNavigate();

  const handlePacientes = () =>{
    navigate("/pacientes")
  }

    return(
        <div className="app-container">
        <header className="header">
          <h1>Panel Médico</h1>
        </header>
  
        <main className="dashboard">
          <section className="welcome">
            <h2>Bienvenida, Dra. Patricia Ruiz</h2>
            <p>Tienes 3 consultas agendadas hoy.</p>
          </section>
  
          <section className="cards">
            <div className="card">
              <h3>Pacientes</h3>
              <p>Ver historial, agregar o buscar pacientes.</p>
              <Button onClick={handlePacientes} size="small">Ver pacientes</Button>
            </div>
  
            <div className="card">
              <h3>Consultas de hoy</h3>
              <p>Revisa tu agenda médica.</p>
              <button>Ir a agenda</button>
            </div>
  
            <div className="card">
              <h3>Crear receta</h3>
              <p>Emitir una receta para un paciente.</p>
              <button>Nueva receta</button>
            </div>
          </section>
        </main>
  
        <footer className="footer">
          <p>&copy; 2025 Matt Med</p>
        </footer>
      </div>
    )
}

export default Dashboard;