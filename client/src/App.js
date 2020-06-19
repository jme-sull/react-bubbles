import React, { useState } from "react";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from './utils/axioswithAuth'

import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute'
import BubblePage from './components/BubblePage'
import "./styles.scss";


const initalLogin = {
  username: '',
  password: ''
}

function App() {

  const [ login, setLogin ] = useState(initalLogin);
  
  const history = useHistory();

  const onInputChange = evt => {
    const name = evt.target.name
    const value = evt.target.value

    setLogin({
        ...login,
        [name]: value 
    })
  }

    const authenticate = (e) => {
      e.preventDefault()
        axiosWithAuth()
            .post('/api/login', login)
            .then(res =>
                window.localStorage.setItem('token', res.data.payload),
                history.push('/bubbles'))
            .catch(err => console.log(err))  
      };

  return (
    
      <div className="App">

      <Switch>
          <Route exact path="/login" component={Login}>
            <Login login={login} onInputChange={onInputChange} authenticate={authenticate} />
          </Route>

        <PrivateRoute path="/bubbles" component={BubblePage} />
      </Switch>
      </div>
    
  );
}

export default App;
