import React, { useContext, useRef } from 'react';
import MainContext from '../context/MainContext';
import { postReq } from '../plugins/http';

export default function Register() {
  const { respMess, setRespMess } = useContext(MainContext);

  const usernameRef = useRef();
  const passOneRef = useRef();
  const passTwoRef = useRef();

  const register = async () => {
    const newUser = {
      username: usernameRef.current.value,
      passOne: passOneRef.current.value,
      passTwo: passTwoRef.current.value,
    };
    const result = await postReq(newUser, 'register');
    if (!result.error) {
      setRespMess(`${result.message}, now you can login`);
      usernameRef.current.value = '';
      passOneRef.current.value = '';
      passTwoRef.current.value = '';
    } else {
      setRespMess(result.message);
    }
  };

  return (
    <div className='auth'>
      <h2>Register</h2>
      {respMess !== '' && <p className='result'>{respMess}</p>}
      <input onClick={() => setRespMess('')} ref={usernameRef} type='text' placeholder='Username...' />
      <input onClick={() => setRespMess('')} ref={passOneRef} type='password' placeholder='Password...' />
      <input onClick={() => setRespMess('')} ref={passTwoRef} type='password' placeholder='Repeat pass...' />
      <button onClick={register}>Sign up</button>
    </div>
  );
}
