import React, { useState, useEffect } from 'react';
import InicioEstudiante from './InicioEstudiante';
import MisPrestamos from './MisPrestamos';
import '../estilos/styles_estudiante.css';

const Estudiante = ({ vista = 'inicio' }) => {
  const [libros, setLibros] = useState([]);
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    const librosLocal = JSON.parse(localStorage.getItem('libros')) || [];
    const disponibles = librosLocal.filter(
      libro => libro.disponible === true || libro.disponible === "true"
    );
    setLibros(disponibles);
  }, []);

  useEffect(() => {
    const solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
    setPrestamos(solicitudes);
  }, []);

  const solicitarPrestamo = (libro) => {
    const nuevaSolicitud = {
      id: Date.now(),
      libroId: libro.id,
      titulo: libro.titulo,
      estado: "pendiente",
    };

    const solicitudesExistentes = JSON.parse(localStorage.getItem('solicitudes')) || [];
    const actualizadas = [...solicitudesExistentes, nuevaSolicitud];
    localStorage.setItem('solicitudes', JSON.stringify(actualizadas));
    setPrestamos(actualizadas);

    alert(`📥 Solicitud enviada para: "${libro.titulo}"`);
  };

  const renderizarVista = () => {
    switch (vista) {
      case 'inicio':
        return <InicioEstudiante libros={libros} solicitarPrestamo={solicitarPrestamo} />;
      case 'prestamos':
        return <MisPrestamos prestamos={prestamos} />;
      case 'favoritos':
        return (
          <div className="placeholder-vista">
            <h2>⭐ Tus favoritos</h2>
            <p>Aquí se mostrarán los libros que hayas marcado como favoritos.</p>
          </div>
        );
      default:
        return <InicioEstudiante libros={libros} solicitarPrestamo={solicitarPrestamo} />;
    }
  };

  return (
    <div style={{ flex: 1, padding: '20px' }}>
      {renderizarVista()}
    </div>
  );
};

export default Estudiante;


