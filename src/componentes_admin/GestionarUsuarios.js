import React, { useEffect, useState } from 'react';
import '../estilos/styles_admin.css';

const GestionarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    usuario: '',
    contraseña: '',
    rol: 'estudiante',
  });
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsuarios(usuariosGuardados);
  }, []);
  

  const guardarEnLocalStorage = (usuariosActualizados) => {
    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  const agregarUsuario = (e) => {
    e.preventDefault();
    if (!nuevoUsuario.usuario || !nuevoUsuario.contraseña) {
      alert('Por favor completa todos los campos.');
      return;
    }
    const actualizados = [...usuarios, nuevoUsuario];
    setUsuarios(actualizados);
    guardarEnLocalStorage(actualizados);
    setNuevoUsuario({ usuario: '', contraseña: '', rol: 'estudiante' });
  };

  // Filtrar usuarios por búsqueda
  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.usuario.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="contenido">
      <h2>Gestionar Usuarios</h2>

      <div className="busqueda-container">
        <input
          type="text"
          placeholder="Buscar usuario por correo..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />
        <button className="boton-buscar">Buscar</button>
      </div>

      {usuariosFiltrados.length === 0 ? (
        <p>No hay usuarios que coincidan.</p>
      ) : (
        <table id="tablaLibros">
          <thead>
            <tr>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.usuario}</td>
                <td>{usuario.rol}</td>
                <td>
                  <button className="boton-editar">Editar</button>
                  <button className="boton-eliminar">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Agregar nuevo usuario</h3>
      <form onSubmit={agregarUsuario} className="formulario-usuario">
        <input
          type="email"
          name="usuario"
          placeholder="Correo electrónico"
          value={nuevoUsuario.usuario}
          onChange={manejarCambio}
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={nuevoUsuario.contraseña}
          onChange={manejarCambio}
          required
        />
        <select name="rol" value={nuevoUsuario.rol} onChange={manejarCambio}>
          <option value="estudiante">Estudiante</option>
          <option value="administrador">Administrador</option>
        </select>
        <button type="submit" className="boton-agregar">Agregar Usuario</button>
      </form>
    </div>
  );
};

export default GestionarUsuarios;
