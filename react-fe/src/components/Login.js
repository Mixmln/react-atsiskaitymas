import React, { useContext, useRef } from 'react';
import MainContext from '../context/MainContext';
import { postReq } from '../plugins/http';

export default function Login() {
  const { respMess, setRespMess, setUser } = useContext(MainContext);

  const usernameRef = useRef();
  const passwordRef = useRef();

  const login = async () => {
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    const result = await postReq(user, 'login');
    if (!result.error) {
      setRespMess(result.message);
      usernameRef.current.value = '';
      passwordRef.current.value = '';
      setUser(result.data);
    } else {
      setRespMess(result.message);
    }
  };
  return (
    <div className='auth'>
      <h2>Login</h2>
      {respMess !== '' && <p className='result'>{respMess}</p>}
      <input ref={usernameRef} onClick={() => setRespMess('')} type='text' placeholder='Username...' />
      <input ref={passwordRef} onClick={() => setRespMess('')} type='password' placeholder='Password...' />
      <button onClick={login}>Log in</button>
    </div>
  );
}
