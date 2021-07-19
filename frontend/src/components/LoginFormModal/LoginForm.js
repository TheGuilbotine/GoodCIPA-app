import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoLogin = () => {
    const credential = 'Demo-lition'
    const password = 'password'
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleSubmit}>
        <button className='demo-button' type='submit' onClick={demoLogin}>Demo and Take a Sip</button>
        <ul className='errors__container'>
          {errors.map((error, idx) => (
            <li key={idx} className='errors'>{error}</li>
            ))}
        </ul>
        <div className='login-form__user-container'>
          <i className='fas fa-beer'>
            <div className='login-form__input-container'>
              <input
                className='login-form__input'
                placeholder='Username or Email'
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </div>
          </i>
        </div>
        <div className='login-form__password-container'>
          <i className='fas fa-lock'>
            <div className='login-form__input-container'>
              <input
                className='login-form__input'
                placeholder='Password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </i>
        </div>
        <button className='login-button' type="submit">Keep Sipping</button>
      </form>
    </div>

  );
}

export default LoginForm;
