import React from 'react';
import Header from './Header';
import Home from './Home';
import Genero from './Genero';
import Series from './Series';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/generos' exact component={Genero} />
          <Route path="/series" exact component={Series} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
