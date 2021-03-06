import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupForm';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <span className='nav-bar__login-signup'>
          <LoginFormModal />
          <SignUpFormModal />
        </span>
      </>
    );
  }

  return (
    <div className='nav-bar'>
      <NavLink className='nav__home-button' exact to='/'>
          <img className='nav__home-button__logo' src='https://i.imgur.com/xOksAty.png' alt='GoodCIPA Logo'/>
          Home
      </NavLink>
      {isLoaded && sessionLinks}
    </div>

  );
}

export default Navigation;
