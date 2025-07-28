import React, { useState, useEffect } from 'react';
import librosData from '../data/libros.json'; 
import '../estilos/styles_admin.css';


const GestionarLibros = () => {
  const [libros, setLibros] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [nuevoLibro, setNuevoLibro] = useState({ titulo: '', autor: '', editorial: '', anio: '' });
  const [editando, setEditando] = useState(null);

  // ⬇️ Carga libros desde localStorage o libros.json
  useEffect(() => {
  const librosGuardados = localStorage.getItem('libros');
  if (librosGuardados) {
    setLibros(JSON.parse(librosGuardados));
  } else {
    setLibros(librosData);
  }
}, []);


  // ⬇️ Guarda los libros cada vez que cambian
useEffect(() => {
  if (libros.length > 0) {
    localStorage.setItem('libros', JSON.stringify(libros));
  }
}, [libros]);

  const manejarCambioBusqueda = (e) => {
    setBusqueda(e.target.value.toLowerCase());
  };

  const filtrarLibros = libros.filter(libro =>
    libro.titulo.toLowerCase().includes(busqueda) ||
    libro.autor.toLowerCase().includes(busqueda) ||
    libro.editorial.toLowerCase().includes(busqueda)
  );

  const manejarCambioNuevoLibro = (e) => {
    const { id, value } = e.target;
    setNuevoLibro(prev => ({ ...prev, [id]: value }));
  };

  const agregarLibro = (e) => {
  e.preventDefault();
  if (!nuevoLibro.titulo || !nuevoLibro.autor || !nuevoLibro.editorial || !nuevoLibro.anio) return;

  const libroConDisponibilidad = {
    id: Date.now(),
    ...nuevoLibro,
    anio: parseInt(nuevoLibro.anio),
    disponible: true // ✅ Añadido
  };

  setLibros([...libros, libroConDisponibilidad]);
  setNuevoLibro({ titulo: '', autor: '', editorial: '', anio: '' });
};


  const eliminarLibro = (index) => {
    if (window.confirm('¿Estás seguro de eliminar este libro?')) {
      const copia = [...libros];
      copia.splice(index, 1);
      setLibros(copia);
    }
  };

  const editarLibro = (index) => {
    setEditando(index);
  };

  const guardarLibro = (index) => {
    const fila = document.getElementById(`fila-${index}`);
    const inputs = fila.querySelectorAll('input');
    const copia = [...libros];

    const libroAnterior = copia[index];

    const actualizado = {
      ...libroAnterior, // ✅ conserva id y disponible
      titulo: inputs[0].value,
      autor: inputs[1].value,
      editorial: inputs[2].value,
      anio: parseInt(inputs[3].value),
    };
    
    copia[index] = actualizado;
    setLibros(copia);
    setEditando(null);
  };

  return (
    <div className="main-content">
      <header>
        <div className="busqueda">
          <input
            type="text"
            placeholder="Buscar por título, autor o editorial..."
            value={busqueda}
            onChange={manejarCambioBusqueda}
          />
          <button>Buscar</button>
        </div>
      </header>

      <section className="gestion-libros">
        <h1>Gestión de Libros</h1>
        <table id="tablaLibros">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Editorial</th>
              <th>Año</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrarLibros.length === 0 ? (
              <tr><td colSpan="5">No se encontraron libros.</td></tr>
            ) : (
              filtrarLibros.map((libro, index) => (
                <tr key={index} id={`fila-${index}`}>
                  {editando === index ? (
                    <>
                      <td><input defaultValue={libro.titulo} /></td>
                      <td><input defaultValue={libro.autor} /></td>
                      <td><input defaultValue={libro.editorial} /></td>
                      <td><input type="number" defaultValue={libro.anio} /></td>
                      <td>
                        <button onClick={() => guardarLibro(index)}>💾 Guardar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{libro.titulo}</td>
                      <td>{libro.autor}</td>
                      <td>{libro.editorial}</td>
                      <td>{libro.anio}</td>
                      <td>
                        <button onClick={() => editarLibro(index)}>✏️ Editar</button>
                        <button onClick={() => eliminarLibro(index)}>🗑️ Eliminar</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        <h2>Agregar nuevo libro</h2>
        <form onSubmit={agregarLibro} id="formAgregarLibro">
          <input
            type="text"
            id="titulo"
            placeholder="Título"
            value={nuevoLibro.titulo}
            onChange={manejarCambioNuevoLibro}
            required
          />
          <input
            type="text"
            id="autor"
            placeholder="Autor"
            value={nuevoLibro.autor}
            onChange={manejarCambioNuevoLibro}
            required
          />
          <input
            type="text"
            id="editorial"
            placeholder="Editorial"
            value={nuevoLibro.editorial}
            onChange={manejarCambioNuevoLibro}
            required
          />
          <input
            type="number"
            id="anio"
            placeholder="Año"
            value={nuevoLibro.anio}
            onChange={manejarCambioNuevoLibro}
            required
          />
          <button type="submit">Agregar libro</button>
        </form>
      </section>
    </div>
  );
};

export default GestionarLibros;
