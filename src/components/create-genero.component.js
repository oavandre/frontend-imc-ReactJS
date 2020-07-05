import React, { Component } from 'react';
import axios from 'axios';


const port_api        = process.env.NODEJS_PORT_API || 5000;
const url_api        = process.env.NODEJS_APP_URI || 'http://localhost';


export default class CreateGenero extends Component {
  constructor(props) {
    super(props);

    this.onChangeGenero = this.onChangeGenero.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      genero: ''
    }
  }

  onChangeGenero(e) {
    this.setState({
      genero: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const genero = {
      genero: this.state.genero
    }

    console.log(genero);

    axios.post(url_api+':'+port_api+'/genero/add', genero)
      .then(res => console.log(res.data));

    this.setState({
      genero: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Adicionar um novo Genero</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Genero: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.genero}
                onChange={this.onChangeGenero}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Criar Genero" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}