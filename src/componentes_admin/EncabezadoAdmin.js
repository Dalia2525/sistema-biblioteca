import React from 'react';

const EncabezadoAdmin = ({ onBuscar, valorBusqueda, setValorBusqueda }) => {
  return (
    <header>
      <div className="busqueda">
        <input
          type="text"
          placeholder="Realiza tu búsqueda aquí..."
          value={valorBusqueda}
          onChange={(e) => setValorBusqueda(e.target.value)}
        />
        <button id="btnBuscar" onClick={onBuscar}>Buscar</button>
      </div>
      <div className="icons">
        <span>🌙</span>
        <span>🔔</span>
        <span className="user">Administrador ▼</span>
      </div>
    </header>
  );
};

export default EncabezadoAdmin;
