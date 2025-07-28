import React from 'react';

const BarraLateralAdmin = ({ setVista }) => {
  return (
    <div className="sidebar">
      <div className="admin-profile">
        <img src="https://img.icons8.com/ios11/512w/FFFFFF/add-user-male.png" alt="Admin Icon" />
        <h3>Administrador</h3>
        <p>Primer Logueo</p>
      </div>
      <nav className="menu">
        <a onClick={() => setVista('inicio')}>Inicio</a>
        <a onClick={() => setVista('gestionarLibros')}>Gestionar libros</a>
        <a onClick={() => setVista('gestionarUsuarios')}>Gestionar usuarios</a>
        <a onClick={() => setVista('login')} className="cerrar-sesion">Cerrar sesión</a>
      </nav>
    </div>
  );
};

export default BarraLateralAdmin;
