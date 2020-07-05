import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import IMCList from "./components/imc-list.component";
import EditIMC from "./components/edit-imc.component";
import CreateIMC from "./components/create-imc.component";
import CreateGenero from "./components/create-genero.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={IMCList} />
      <Route path="/edit/:id" component={EditIMC} />
      <Route path="/create" component={CreateIMC} />
      <Route path="/genero" component={CreateGenero} />
      </div>
    </Router>
  );
}

export default App;