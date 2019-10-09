import React, { useState, useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import axios from 'axios';
import Generos from './Generos';
import Series from './Series';
import NovoGenero from './NovoGenero';
import EditarGenero from './EditarGenero';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get('/api')
      .then(res => {
        setData(res.data)
      })
  }, [])
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/generos' exact component={Generos} />
          <Route path="/generos/novo" exact component={NovoGenero} />
          <Route path="/generos/:id" exact component={EditarGenero} />
          <Route path="/series" exact component={Series} />
        </Switch>
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  );
}

export default App;
