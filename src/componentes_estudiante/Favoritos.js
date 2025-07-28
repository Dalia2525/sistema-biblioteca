import React, { useEffect, useState } from 'react';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(favs);
  }, []);

  const quitarFavorito = (id) => {
    const nuevos = favoritos.filter((libro) => libro.id !== id);
    setFavoritos(nuevos);
    localStorage.setItem('favoritos', JSON.stringify(nuevos));
  };

  return (
    <div className="inicio-estudiante">
      <h2>📚 Mis Favoritos</h2>
      <div className="resultados-libros">
        {favoritos.length === 0 ? (
          <p>No hay libros marcados como favoritos.</p>
        ) : (
          favoritos.map((libro) => (
            <div key={libro.id} className="tarjeta-libro">
              {libro.imagen && <img src={libro.imagen} alt={libro.titulo} />}
              <h3>{libro.titulo}</h3>
              <p>{libro.autor}</p>
              <button onClick={() => quitarFavorito(libro.id)}>❌ Quitar Favorito</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favoritos;
