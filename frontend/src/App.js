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


// Before Modal

// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { Route, Switch } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
// import Navigation from './components/Navigation';
// import * as sessionActions from './store/session';

// function App() {
//     const dispatch = useDispatch();
//     const [isLoaded, setIsLoaded] = useState(false);
//     useEffect(() => {
//         dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
//     }, [dispatch]);

//     return (
//         <>
//           <Navigation isLoaded={isLoaded} />
//           {isLoaded && (
//             <Switch>
//               <Route path='/login'>
//                 <LoginFormPage />
//               </Route>
//               <Route path='/signup'>
//                 <SignupFormPage />
//               </Route>
//             </Switch>
//           )}
//         </>
//       );
//     }

// export default App;
