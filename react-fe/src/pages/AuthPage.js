import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import Register from '../components/Register';
import MainContext from '../context/MainContext';

export default function AuthPage() {
  const [auth, setAuth] = useState('login');

  const { setRespMess, user } = useContext(MainContext);

  return (
    <div>
      {user && <Header></Header>}
      <div className='container auth-page'>
        <div className='auth-page__header'>
          <h4
            onClick={() => {
              setAuth('login');
              setRespMess('');
            }}
          >
            Login
          </h4>
          <h4
            onClick={() => {
              setAuth('register');
              setRespMess('');
            }}
          >
            Register
          </h4>
        </div>
        {auth === 'register' && <Register setAuth={setAuth} />}
        {auth === 'login' && <Login setAuth={setAuth} />}
      </div>
    </div>
  );
}
