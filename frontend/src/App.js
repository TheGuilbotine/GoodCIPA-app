import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage'
import ProfilePage from './components/ProfilePage';
import IpaList from './components/IpaListPage';
import IpaPage from './components/IpaPage/IpaPage';
import CrackedOpen from './components/CrackedOpen';
import Footer from './components/Footer'
import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/profile'>
            <ProfilePage />
          </Route>
          <Route path='/ipas'>
            <IpaList />
          </Route>
          <Route path='/cracked-open'>
            <CrackedOpen />
          </Route>
          <Route path='/ipas/:id'>
            <IpaPage />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
