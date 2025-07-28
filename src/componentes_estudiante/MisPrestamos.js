import React, { useState, useEffect } from 'react';

const MisPrestamos = () => {
  const [todosLosLibros, setTodosLosLibros] = useState([]);
  const [misSolicitudes, setMisSolicitudes] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    const librosLocal = JSON.parse(localStorage.getItem('libros')) || [];
    setTodosLosLibros(librosLocal);

    const usuario = JSON.parse(localStorage.getItem('usuario_actual'));
    setUsuarioActual(usuario);
  }, []);

  useEffect(() => {
    const solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
    setMisSolicitudes(solicitudes);
  }, []);

  const solicitarPrestamo = (libro) => {
    if (!usuarioActual) {
      alert("❗ Debes iniciar sesión primero.");
      return;
    }

    const yaSolicitadoPorMi = misSolicitudes.some(
      (s) =>
        s.libroId === libro.id &&
        s.usuarioId === usuarioActual.id &&
        s.estado === "pendiente"
    );

    if (yaSolicitadoPorMi) {
      alert("⛔ Ya solicitaste este libro.");
      return;
    }

    const nuevaSolicitud = {
      id: Date.now(),
      libroId: libro.id,
      titulo: libro.titulo,
      estado: "pendiente",
      usuarioId: usuarioActual.id,
    };

    const actualizadas = [...misSolicitudes, nuevaSolicitud];
    localStorage.setItem('solicitudes', JSON.stringify(actualizadas));
    setMisSolicitudes(actualizadas);

    alert(`📥 Solicitud enviada para: "${libro.titulo}"`);
  };

  return (
    <div className="mis-prestamos">
      <h2>📚 Libros disponibles</h2>
      <div className="lista-libros">
        {todosLosLibros.map((libro) => {
          const estaDisponible =
            libro.disponible === true || libro.disponible === "true";

          const yaSolicitadoPorMi = misSolicitudes.some(
            (s) =>
              s.libroId === libro.id &&
              s.usuarioId === usuarioActual?.id &&
              s.estado === "pendiente"
          );

          return (
            <div key={libro.id} className="tarjeta-libro">
              <h3>{libro.titulo}</h3>
              <p>{libro.autor}</p>

              {estaDisponible ? (
                yaSolicitadoPorMi ? (
                  <button disabled>⏳ Ya solicitado</button>
                ) : (
                  <button onClick={() => solicitarPrestamo(libro)}>
                    📨 Solicitar Préstamo
                  </button>
                )
              ) : (
                <button disabled>🔒 Prestado</button>
              )}
            </div>
          );
        })}
      </div>

      <h2>📝 Mis Solicitudes</h2>
      <ul>
        {misSolicitudes
          .filter((s) => s.usuarioId === usuarioActual?.id)
          .map((sol) => (
            <li key={sol.id}>
              {sol.titulo} - <strong>{sol.estado}</strong>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MisPrestamos;
