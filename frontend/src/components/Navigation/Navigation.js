import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
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
          <NavLink className='nav__signup-button' to="/signup">Create Account</NavLink>
        </span>
      </>
    );
  }

  return (
    <div className='nav-bar'>
      <NavLink className='nav__home-button' exact to="/">GoodCIPA</NavLink>
      {isLoaded && sessionLinks}
    </div>

  );
}

export default Navigation;
