import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  let currentLocation = location.pathname;

  const openMenu = () => {
    if (currentLocation === '/') {
      history.push('/profile')
    }
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  return (
    <>
      <button className='profile-button' onClick={openMenu}>
        <i className="fas fa-wine-bottle"></i>
        <p>{user.username}</p>
        {/* <i className="fab fa-old-republic" /> */}
      </button>
      {showMenu && (
        <ul className='profile-dropdown'>
          <li className='profile-dropdown__user'>{user.username}</li>
          <li className='profile-dropdown__email'>{user.email}</li>
          <li>
            <button className='profile-dropdown__logout' onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
