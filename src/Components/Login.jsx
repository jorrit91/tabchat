import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

import { getUser } from '../helpers/getUser'; 
import { Users } from '../data/users';
import Logo from '../assets/tabchat-logo.png';

const loggedIn = getUser();

const Login = () => {
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const [userSet, setUserSet] = useState(false);
  const handleForm = (e) => {
    e.preventDefault();
    const userIndex = Users.findIndex(user => user.userName.toLowerCase() === e.target[0].value);
    if (userIndex !== -1) {
      setUserSet(true);
      sessionStorage.setItem('curUser', JSON.stringify(Users[userIndex].id) );

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else {
      setError('Unknown user');
    }
  };


  if (loggedIn) return (
		<Redirect to={"/"} />
	);

	return (
    <Fragment>
      <div className={'welcome ' + ( userSet ? 'active' : '')}>
        <img src={Logo} alt="logo" />
      </div>

      <div className={"login-form " + ( userSet ? 'remove' : '')}>
        <h2>Welcome to <span>Tabchat!</span></h2>
        <p>Please enter your username to get started <br/><span>(It's probably something like "johndoe", "jimdoe" or "janedoe")</span></p>
        <form onSubmit={handleForm}>
          <div className={(!error ? '' : 'error')}>
            <input type={'text'}
                    onChange={(e) => {
                      setUser(e.target.value)
                      setError('')
                    }}
                    value={user} />
            <p>{error}</p>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>

    </Fragment>
	);
}

export default Login;
