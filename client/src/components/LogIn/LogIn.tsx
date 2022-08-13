import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IUser } from '../../types/types';

interface Props {
  id: number
  setId(id: number): void
}

const LogIn: React.FC<Props> = ({ id, setId }) => {
  const navigate = useNavigate();

  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = {
      username,
      password
    };
    const loggedInUser: string = await (await axios.post('http://localhost:8080/users/login', user)).data
    console.log(loggedInUser);
    
    setId(parseInt(loggedInUser, 10));
    navigate('/home');
  }

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);

  // useEffect (() => {
  //   navigate('/home');
  // }, [id])

  const onClick = () => navigate('/signup')

  return (
    <div className="login">
      <form className="login__form" onSubmit={onSubmit}>
        <input className="form__username" required type="text" placeholder="Username..." onChange={handleUsername}/>
        <input className="form__password" required type="password" placeholder="Password..." onChange={handlePassword}/>
        <button className="from__button" type="submit">LogIn</button>
        {(username === 'No username found.' || username === 'Your password is incorrect.') && <p>{username}</p>}
      </form>
      <p className="login__no-account">
        <button className="no-account__to-login" onClick={onClick}>SignUp</button>
         if you don't have an account yet!</p>
    </div>
  )
};

export default LogIn;