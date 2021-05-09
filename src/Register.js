import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './Header';

function Register() {
  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      history.push('/add');
    }
  }, []); //Blank Array to run one time only
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  async function signup() {
    let item = { name, email, password };
    // console.warn(item);
    let result = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(item),
    });
    result = await result.json();
    console.warn('result', result);
    localStorage.setItem('user-info', JSON.stringify(result));
    history.push('/add');
  }

  return (
    <>
      <Header />
      <div className='col-6 offset-sm-3'>
        <h1>User Sign Up</h1>
        <input
          type='text'
          placeholder='name'
          value={name}
          onChange={e => setName(e.target.value)}
          className='form-control'
        />
        <br />
        <input
          type='text'
          placeholder='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          className='form-control'
        />
        <br />
        <input
          type='text'
          placeholder='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='form-control'
        />
        <br />
        <button onClick={signup} className='btn btn-primary'>
          Sign Up
        </button>
      </div>
    </>
  );
}

export default Register;
