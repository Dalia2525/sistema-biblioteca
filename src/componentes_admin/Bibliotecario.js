import React, { useState, useEffect } from 'react';

const Bibliotecario = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('solicitudes');
    if (data) {
      setSolicitudes(JSON.parse(data));
    }
  }, []);

  const actualizarEstado = (id, nuevoEstado) => {
    const actualizadas = solicitudes.map((s) =>
      s.id === id ? { ...s, estado: nuevoEstado } : s
    );

    setSolicitudes(actualizadas);
    localStorage.setItem('solicitudes', JSON.stringify(actualizadas));

    if (nuevoEstado === 'aprobado') {
      const libros = JSON.parse(localStorage.getItem('libros')) || [];
      const solicitud = solicitudes.find((s) => s.id === id);

      const nuevosLibros = libros.map((libro) =>
        libro.id === solicitud.libroId ? { ...libro, disponible: false } : libro
      );

      localStorage.setItem('libros', JSON.stringify(nuevosLibros));
    }
  };

  const devolverLibro = (solicitud) => {
    const nuevasSolicitudes = solicitudes.map((s) =>
      s.id === solicitud.id ? { ...s, estado: 'devuelto' } : s
    );
    setSolicitudes(nuevasSolicitudes);
    localStorage.setItem('solicitudes', JSON.stringify(nuevasSolicitudes));

    const libros = JSON.parse(localStorage.getItem('libros')) || [];
    const actualizados = libros.map((libro) =>
      libro.id === solicitud.libroId ? { ...libro, disponible: true } : libro
    );
    localStorage.setItem('libros', JSON.stringify(actualizados));
  };

  const pendientes = solicitudes.filter((s) => s.estado === 'pendiente');
  const aprobadas = solicitudes.filter((s) => s.estado === 'aprobado');
  const rechazadas = solicitudes.filter((s) => s.estado === 'rechazado');
  const devueltas = solicitudes.filter((s) => s.estado === 'devuelto');
  const total = solicitudes.length;

  return (
    <div className="main-content">
  <h1 style={{ marginBottom: '20px' }}>👋 ¡Bienvenido, Administrador!</h1>

  <div className="resumen-grid">
    <div className="tarjeta-resumen">📋 Total: {total}</div>
    <div className="tarjeta-resumen pendiente">⏳ Pendientes: {pendientes.length}</div>
    <div className="tarjeta-resumen aprobado">✅ Aprobadas: {aprobadas.length}</div>
    <div className="tarjeta-resumen devuelto">📦 Devueltas: {devueltas.length}</div>
  </div>

  <h2>📥 Solicitudes Pendientes</h2>
  <ul className="lista-solicitudes">
    {pendientes.length === 0 ? (
      <p>No hay solicitudes pendientes.</p>
    ) : (
      pendientes.map((s) => (
        <li key={s.id} className="solicitud-item">
          <span>{s.titulo}</span>
          <div className="acciones">
            <button onClick={() => actualizarEstado(s.id, 'aprobado')}>✅</button>
            <button onClick={() => actualizarEstado(s.id, 'rechazado')}>❌</button>
          </div>
        </li>
      ))
    )}
  </ul>

  <h2>✅ Aprobadas</h2>
  <ul className="lista-solicitudes">
    {aprobadas.map((s) => (
      <li key={s.id} className="solicitud-item">
        <span>{s.titulo}</span>
        <div className="acciones">
          <button onClick={() => devolverLibro(s)}>🔁</button>
        </div>
      </li>
    ))}
  </ul>

  <h2>❌ Rechazadas</h2>
  <ul className="lista-solicitudes simple">
    {rechazadas.map((s) => (
      <li key={s.id}>{s.titulo}</li>
    ))}
  </ul>

  <h2>📦 Devueltas</h2>
  <ul className="lista-solicitudes simple">
    {devueltas.map((s) => (
      <li key={s.id}>{s.titulo}</li>
    ))}
  </ul>
</div>
  );
}

export default Bibliotecario;
