import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

const port_api        = process.env.NODEJS_PORT_API || 5000;
const url_api        = process.env.NODEJS_APP_URI || 'http://localhost';

export default class EditImc extends Component {
  constructor(props) {
    super(props);

    this.onChangeGenero = this.onChangeGenero.bind(this);
    this.onChangeAltura = this.onChangeAltura.bind(this);
    this.onChangeMassa  = this.onChangeMassa.bind(this);
    this.onChangeValor  = this.onChangeValor.bind(this);
    this.onSubmit       = this.onSubmit.bind(this);


    this.state = {
      genero: '',
      altura: 0,
      massa: 0,
      valor: 0,
      generos: []
    }
  }

  componentDidMount() {
    axios.get(url_api+':'+port_api+'/imc/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            genero: response.data.genero,
            altura: response.data.altura,
            massa: response.data.massa,
            valor: response.data.valor
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get(url_api+':'+port_api+'/genero/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            generos: response.data.map(genero => genero.genero),
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

    axios.post(url_api+':'+port_api+'/imc/update/' + this.props.match.params.id, imc)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Exercise Log</h3>
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
        <div className="form-group">
          <label>Valor IMC: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.valor}
              onChange={this.onChangeValor}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Editar IMC" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}