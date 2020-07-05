import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Desafio IMC</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">IMC</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Cadastrar IMC</Link>
          </li>
          {/*
                    <li className="navbar-item">
          <Link to="/genero" className="nav-link">Cadastrar novo Genero</Link>
          </li>
          */ }

        </ul>
        </div>
      </nav>
    );
  }
}