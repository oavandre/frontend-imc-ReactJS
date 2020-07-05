import React, { Component } from 'react';
import axios from 'axios';
//import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateIMC extends Component {
  constructor(props) {
    super(props);

    this.onChangeGenero = this.onChangeGenero.bind(this);
    this.onChangeAltura = this.onChangeAltura.bind(this);
    this.onChangeMassa = this.onChangeMassa.bind(this);
    this.onChangeValor = this.onChangeValor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        genero: '',
        altura: 0,
        massa: 0,
        valor: 0,
        generos: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/genero/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            generos: response.data.map(genero => genero.genero),
            genero: response.data[0].genero
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeGenero(e) {
    this.setState({
      genero: e.target.value
    })
  }

  onChangeAltura(e) {
    this.setState({
      altura: e.target.value
    })
  }

  onChangeMassa(e) {
    this.setState({
      massa: e.target.value
    })
  }

  onChangeValor(e) {
    this.setState({
        valor: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const imc = {
        genero: this.state.genero,
        altura: this.state.altura,
        massa: this.state.massa,
        valor: this.state.valor
    }

    console.log(imc);

    axios.post('http://localhost:5000/imc/add', imc)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Adicionar um novo IMC</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Genero: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.genero}
              onChange={this.onChangeGenero}>
              {
                this.state.generos.map(function(genero) {
                  return <option 
                    key={genero}
                    value={genero}>{genero}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Altura: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.altura}
              onChange={this.onChangeAltura}
              />
        </div>
        <div className="form-group">
          <label>Peso: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.massa}
              onChange={this.onChangeMassa}
              />
        </div>
        {/* resolvir colcoar um alerta vindo do banco de dados Mongo
        <div className="form-group">
          <label>Valor: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.valor}
              onChange={this.onChangeValor}
              />
        </div>
        */}
        <div className="form-group">
          <input type="submit" value="Calcular" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}