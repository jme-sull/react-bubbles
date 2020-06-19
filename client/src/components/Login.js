import React from "react";



const Login = (props) => {

  

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Login Here</p>
      <form onSubmit={props.authenticate} className='form'>
        <label>Username</label>
            <input 
              name='username'
              value={props.login.username}
              onChange={props.onInputChange}/>
          <label>Password</label>
            <input 
                name='password'
                value={props.login.password}
                onChange={props.onInputChange}/>

            <button>Submit</button>
  
      </form>
    </>
  );
};

export default Login;
