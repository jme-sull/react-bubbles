import React, { useState } from "react";
import { BrowserRouter as Route } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from './utils/axioswithAuth'

import Login from "./components/Login";
import "./styles.scss";


const initalLogin = {
  username: '',
  password: ''
}

function App() {

  const [ login, setLogin ] = useState(initalLogin);
  
  let history = useHistory();

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
                history.push('/'))
            .catch(err => console.log(err))  
      };

  return (
    
      <div className="App">
        <Route exact path="/" component={Login}>
          <Login login={login} onInputChange={onInputChange} authenticate={authenticate} />
        </Route>

        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    
  );
}

export default App;
