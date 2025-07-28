import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = ({ onSeleccionarRol }) => {
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const [nuevoUsuario, setNuevoUsuario] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [nuevoRol, setNuevoRol] = useState('estudiante');

  useEffect(() => {
    document.body.className = 'login';
    return () => {
      document.body.className = '';
    };
  }, []);

  const validarLogin = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(
      (u) => u.usuario === usuario && u.contrasena === contrasena
    );

    if (usuarioEncontrado) {
      // ✅ Guarda al usuario que inició sesión
      localStorage.setItem('usuario_actual', JSON.stringify(usuarioEncontrado));

      const rol = usuarioEncontrado.rol === 'administrador' ? 'bibliotecario' : 'estudiante';
      onSeleccionarRol(rol);
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  };


  const registrar = (e) => {
    e.preventDefault();

    if (!nuevoUsuario || !nuevaContrasena || !nuevoRol) {
      alert('Completa todos los campos.');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.find((u) => u.usuario === nuevoUsuario)) {
      alert('Este usuario ya está registrado.');
      return;
    }

    usuarios.push({
      usuario: nuevoUsuario,
      contrasena: nuevaContrasena,
      rol: nuevoRol,
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuario registrado correctamente.');
    setNuevoUsuario('');
    setNuevaContrasena('');
    setNuevoRol('estudiante');
    setMostrarRegistro(false);
  };

  const recuperarContrasena = () => {
    const correo = prompt('Ingrese su correo registrado:');
    if (!correo) return;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find((u) => u.usuario === correo.trim());

    if (usuarioEncontrado) {
      alert(`Tu contraseña es: ${usuarioEncontrado.contrasena}`);
    } else {
      alert('No se encontró ningún usuario con ese correo.');
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <img src="/logo-Uleam.png" alt="Logo ULEAM" className="logo" />
        <h2>
          Bienvenido a<br />Biblioteca ULEAM
        </h2>

        {!mostrarRegistro && (
          <form onSubmit={validarLogin}>
            <label htmlFor="usuario">Usuario:</label>
            <input
              type="email"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />

            <label htmlFor="contrasena">Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="********"
              required
            />
            
            <button type="submit">Acceder</button>
            <button type="button" onClick={() => setMostrarRegistro(true)}>
              Crear cuenta
            </button>
          </form>
        )}

        <button onClick={recuperarContrasena} className="link-button">
                 ¿Olvidó su contraseña?
            </button>

        {mostrarRegistro && (
          <form onSubmit={registrar}>
            <h3>Crear cuenta nueva</h3>

            <label htmlFor="nuevoUsuario">Correo:</label>
            <input
              type="email"
              id="nuevoUsuario"
              value={nuevoUsuario}
              onChange={(e) => setNuevoUsuario(e.target.value)}
              required
            />

            <label htmlFor="nuevaContrasena">Contraseña:</label>
            <input
              type="password"
              id="nuevaContrasena"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
              required
            />

            <label htmlFor="nuevoRol">Rol:</label>
            <select
              id="nuevoRol"
              value={nuevoRol}
              onChange={(e) => setNuevoRol(e.target.value)}
              required
            >
              <option value="estudiante">Estudiante</option>
              <option value="administrador">Administrador</option>
            </select>

            <button type="submit">Registrarse</button>
            <button type="button" onClick={() => setMostrarRegistro(false)}>
              Cancelar
            </button>
          </form>
        )}
      </div>

      <div className="right-section">
        <img
          src="/img-biblioteca.png"
          alt="Ilustración Biblioteca"
          className="imagen-biblioteca"
        />
      </div>
    </div>
  );
};

export default Login;
