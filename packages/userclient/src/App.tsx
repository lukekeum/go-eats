import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import './styles/response.scss';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
