import React, { Component } from 'react';
import axios from 'axios';


const port_api        = process.env.NODEJS_PORT_API || 5000;
const url_api        = process.env.NODEJS_APP_URI || 'http://localhost';


const Imc = props => (
  <tr>
    <td>{props.imc.genero}</td>
    <td>{props.imc.altura}</td>
    <td>{props.imc.massa}</td>
    {/**/}
    <td>{props.imc.valor}</td>
    <td>{props.imc.classif}</td>
    

  </tr>
)

export default class ImcList extends Component {
  constructor(props) {
    super(props);

    //this.deleteImc = this.deleteImc.bind(this)

    this.state = {imc: []};
  }

  componentDidMount() {
    axios.get(url_api+':'+port_api+'/imc/')
      .then(response => {
        this.setState({ imc: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete(url_api+':'+port_api+'/imc/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      imc: this.state.imc.filter(el => el._id !== id)
    })
  }

  imcList() {
    return this.state.imc.map(currentimc => {
      return <Imc imc={currentimc} deleteImc={this.deleteImc} key={currentimc._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Lista de IMC cadastrados</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Genero</th>
              <th>Altura</th>
              <th>Peso</th>
              {/**/}
              <th>Valor IMC</th>
              <th>Classic</th>

              

            </tr>
          </thead>
          <tbody>
            { this.imcList() }
          </tbody>
        </table>
      </div>
    )
  }
}