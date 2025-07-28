import React from 'react';
import '../estilos/styles_estudiante.css';

const BarraLateralEstudiante = ({ setVista }) => {
  return (
    <div className="sidebar">
      <div className="admin-profile">
        <img src="https://images.icon-icons.com/2483/PNG/512/profile_menu_icon_149887.png" alt="Estudiante Icon" />
        <h3>Estudiante</h3>
        <p>Dayana</p>
      </div>
      <nav className="menu">
        <a href="#" onClick={() => setVista('inicio')}>Inicio</a>
        <a href="#" onClick={() => setVista('prestamos')}>Mis préstamos</a>
        <a href="#" onClick={() => setVista('favoritos')}>Favoritos</a>
        <a href="#" className="cerrar-sesion" onClick={() => window.location.href = '/'}>Cerrar sesión</a>
      </nav>
      <div className="recientes">
        <h4>Actividades recientes</h4>
        <p>📕 Devolviste: Cien años de soledad el 23 de mayo</p>
        <p>✅ Tu reserva de El origen de las especies está aprobada</p>
      </div>
    </div>
  );
};

export default BarraLateralEstudiante;
