import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignUpForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='signup-container'>
      <form className='signup-form' onSubmit={handleSubmit}>
        <ul className='errors__container'>
          {errors.map((error, idx) => <li key={idx} className='errors'>{error}</li>)}
        </ul>
        <div className='signup-form__input-container'>
          <i className='fas fa-at'>
            <div className='signup-form__input-container'>
              <input
                className='signup-form__input'
                placeholder='Email Address'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </i>
        </div>
        <div className='signup-form__input-container'>
          <i className='fas fa-user'>
            <div className='signup-form__input-container'>
              <input
                className='signup-form__input'
                placeholder='Username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </i>
        </div>
        <div className='signup-form__input-container'>
          <i className='fas fa-lock'>
            <div className='signup-form__input-container'>
              <input
                className='signup-form__input'
                placeholder='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </i>
        </div>
        <div className='signup-form__input-container'>
          <i className='fas fa-lock'>
            <div className='signup-form__input-container'>
              <input
                className='signup-form__input'
                placeholder='Confirm your Password'
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </i>
        </div>
        <div className='signup-form__checkbox-container'>
          <p className='signup-form__text'>21 or older?</p>
          <i className='fas fa-beer'>
            <div className='signup-form__input-container'>
              <input
                // TODO implement background check
                className='signup-form__checkbox'
                placeholder='Confirm your Password'
                type='checkbox'
                required
              />
            </div>
          </i>
        </div>
        <button className='signup-button' type='submit'>Start Sipping</button>
      </form>
    </div>
  );
}

export default SignupForm;
