import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Estudiante from './componentes_estudiante/Estudiante';
import Bibliotecario from './componentes_admin/Bibliotecario';
import GestionarLibros from './componentes_admin/GestionarLibros';
import Favoritos from './componentes_estudiante/Favoritos';
import GestionarUsuarios from './componentes_admin/GestionarUsuarios';

function App() {
  const [rol, setRol] = useState(null);

  const manejarSeleccionRol = (rolElegido) => {
    setRol(rolElegido);
  };

  return (
    <div className="app-layout">

      {/* Barra lateral dinámica */}
      {(rol === 'bibliotecario' || rol === 'estudiante') && (
        <div className="sidebar">
          <div className="admin-profile">
            <img
              src={
                rol === 'bibliotecario'
                  ? "https://img.icons8.com/ios11/512w/FFFFFF/add-user-male.png"
                  : "https://images.icon-icons.com/2483/PNG/512/profile_menu_icon_149887.png"
              }
              alt={`${rol} Icon`}
            />
            <h3>{rol.charAt(0).toUpperCase() + rol.slice(1)}</h3>
            <p>Sesión activa</p>
          </div>

          <nav className="menu">
            <Link to="/">Inicio</Link>

            {rol === 'bibliotecario' && (
              <>
                <Link to="/gestionar-libros">Gestionar Libros</Link>
                <Link to="/gestionar-usuarios">Gestionar Usuarios</Link> 
              </>
            )}

            {rol === 'estudiante' && (
              <>
                <Link to="/mis-prestamos">Mis Préstamos</Link>
                <Link to="/favoritos">Favoritos</Link>
              </>
            )}

            <button onClick={() => setRol(null)} className="cerrar-sesion enlace">
              Cerrar sesión
            </button>
          </nav>
        </div>
      )}

      {/* Contenido principal */}
      <div className="main-content">
        <Routes>
          {/* Pantalla de login por defecto */}
          {!rol && (
            <Route path="*" element={<Login onSeleccionarRol={manejarSeleccionRol} />} />
          )}

          {/* Rutas para el estudiante */}
          {rol === 'estudiante' && (
            <>
              <Route path="/" element={<Estudiante vista="inicio" />} />
              <Route path="/mis-prestamos" element={<Estudiante vista="prestamos" />} />
              <Route path="/reservas" element={<Estudiante vista="reservas" />} />
              <Route path="/favoritos" element={<Favoritos />} />

            </>
          )}

          {/* Rutas para el bibliotecario */}
          {rol === 'bibliotecario' && (
            <>
              <Route path="/" element={<Bibliotecario />} />
              <Route path="/gestionar-libros" element={<GestionarLibros />} />
              <Route path="/gestionar-usuarios" element={<GestionarUsuarios />} /> 
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
