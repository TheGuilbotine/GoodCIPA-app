import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage'
import ProfilePage from './components/ProfilePage';
import IpaList from './components/IpaListPage';
import IpaPage from './components/IpaPage';
import CrackedOpen from './components/CrackedOpen';
import AddIpa from './components/AddIpa';
import EditIpa from './components/EditIpa/EditIpa';
import CrackOpen from './components/CrackOpen';
import EditCrackedOpen from './components/EditCrackedOpen';
import Footer from './components/Footer';
import './index.css';

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
          <Route exact path='/ipas'>
            <IpaList />
          </Route>
          <Route exact path='/ipas/:id'>
            <IpaPage />
          </Route>
          <Route path='/new-ipa'>
            <AddIpa />
          </Route>
          <Route path='/edit-ipa/:id'>
            <EditIpa />
          </Route>
          <Route path='/cracked-open'>
            <CrackedOpen />
          </Route>
          <Route path='/crack-open/:id'>
            <CrackOpen />
          </Route>
          <Route path='/edit-cracked-open/:id'>
            <EditCrackedOpen />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
