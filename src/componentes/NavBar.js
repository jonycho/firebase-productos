import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
             <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/home">Tech <i className="fa-brands fa-shopify"></i>hop</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/mostrar">Panel</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crearproducto">Subir productos</Link>
                </li>
              </ul>
            </div>
          </div>
      </nav>
      <Outlet />
        </>
    );
}

export default NavBar;
