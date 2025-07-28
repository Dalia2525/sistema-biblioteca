import React, { useState, useEffect, useCallback } from 'react'; // ← incluye useCallback
import '../estilos/styles_estudiante.css';

const InicioEstudiante = () => {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [favoritos, setFavoritos] = useState(() => {
    return JSON.parse(localStorage.getItem('favoritos')) || [];
  });

  // ⏱️ Ahora está memorizada
  const buscarLibros = useCallback(async (busqueda) => {
    const termino = busqueda || query;
    if (!termino) return;

    const respuesta = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${termino}`
    );
    const datos = await respuesta.json();
    if (datos.items) {
      setResultados(datos.items);
    } else {
      setResultados([]);
    }
  }, [query]); // ← usa query como dependencia

  const esFavorito = (libroId) => favoritos.some((f) => f.id === libroId);

  const toggleFavorito = (libro) => {
    const yaEsFavorito = esFavorito(libro.id);
    const nuevosFavoritos = yaEsFavorito
      ? favoritos.filter((f) => f.id !== libro.id)
      : [...favoritos, libro];

    setFavoritos(nuevosFavoritos);
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
  };

  // Mostrar libros automáticamente al iniciar
  useEffect(() => {
    const temaInicial = 'Libros populares';
    setQuery(temaInicial);
    buscarLibros(temaInicial);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="inicio-estudiante">
      <h2>🔎 Buscar libros online</h2>
      <div className="barra-busqueda">
        <input
          type="text"
          placeholder="Escribe el título del libro..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={() => buscarLibros(query)}>Buscar</button>
      </div>

      <div className="resultados-libros">
        {resultados.map((item) => {
          const info = item.volumeInfo;
          const libro = {
            id: item.id,
            titulo: info.title,
            autor: info.authors ? info.authors.join(', ') : 'Desconocido',
            imagen: info.imageLinks?.thumbnail || '',
          };

          return (
            <div key={item.id} className="tarjeta-libro">
              {libro.imagen && <img src={libro.imagen} alt={libro.titulo} />}
              <h3>{libro.titulo}</h3>
              <p>{libro.autor}</p>
              <button onClick={() => toggleFavorito(libro)}>
                {esFavorito(libro.id)
                  ? '❤️ Quitar Favorito'
                  : '🤍 Agregar a Favoritos'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InicioEstudiante;
