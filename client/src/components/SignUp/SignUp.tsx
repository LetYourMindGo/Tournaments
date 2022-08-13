import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IUser } from '../../types/types';

interface Props {
  id: number
  setId(id: number): void
}

const SignUp: React.FC<Props> = ({ id, setId }) => {
  const navigate = useNavigate();

  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);
  const handleConfirmedPassword = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmedPassword(e.currentTarget.value);

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      setPasswordMatch(false);
      return;
    };
    setId(Date.now())
    const user: IUser = { id, username, password }
    
    const signUp = (await axios.post('http://localhost:8080/users/signup', user)).data
    console.log(signUp);
    
    if(signUp === 'User already exists') {
      setUsername('User already exists')
      return
    }
    navigate('/home')
    return
  };

  const onClick = () => navigate('/login')

  return (
    <div className="signup">
    <form className="signup__form" onSubmit={onSubmit}>
      <input className="form__username" required type="text" placeholder="Username..." onChange={handleUsername}/>
      <input className="form__password" required type="password" placeholder="Password..." onChange={handlePassword}/>
      <input className="form__password" required type="password" placeholder="Confirm password..." onChange={handleConfirmedPassword}/>
      {(username === 'User already exists') && <p>{username}</p>}
      <p className={ passwordMatch ? "hidden" : "error" }>Your passwords don't match!</p>
      <button className="from__button" type="submit">SignUp</button>
      {username === 'Username already taken.' && <p>{username}</p>}
    </form>
    <p className="login__no-account">
      <button className="no-account__to-login" onClick={onClick}>LogIn</button>
       if you already have an account!</p>
  </div>
  )
};

export default SignUp;