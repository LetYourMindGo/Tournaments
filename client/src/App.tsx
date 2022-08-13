import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import Tournaments from './components/Tournaments/Tournaments';
import NewTournament from './components/NewTournament/NewTournament';

function App() {
  const [ id, setId] = useState<number>(0);

  return (
    <div className="tournament-app">
      <div className='tournament-app__main-container'>
        <Routes>
          <Route path="/login" element={(
            <>
              <header className="app-header">
                <p>Tournaments LogIn</p>
              </header>
              <LogIn id={id} setId={setId} />
              <footer className='app-footer'>Enjoy</footer>
            </>
          )} />
          <Route path="/signup" element={(
            <>
              <header className="app-header">
                <p>Tournaments SignUp</p>
              </header>
              <SignUp id={id} setId={setId} />
              <footer className='app-footer'>Enjoy</footer>
            </>
          )} />
          <Route path="/home" element={(
            <>
              <header className="app-header">
                <p>Tournaments Home</p>
              </header>
              <div>
                <h1>Welcome {id}!</h1>
                <Tournaments />
                <NewTournament />
              </div>
              <footer className='app-footer'>Enjoy</footer>
            </>
          )} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
