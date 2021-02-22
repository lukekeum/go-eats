import axios from 'axios';
import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import useLogin from './hooks/useLogin';
import Main from './pages/Main';
import './styles/response.scss';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

function App() {
  const [, silentFN] = useLogin();
  useEffect(() => {
    silentFN();
  }, [silentFN]);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
