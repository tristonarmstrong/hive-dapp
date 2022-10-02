import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GUN from 'gun/gun'
import SEA from 'gun/sea'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './screens/login'
import Main from './screens/main';
import PickTeam from './screens/pickteam'
import CreateTeam from './screens/createteam'
import UserContextProvider from './hooks/user';
import JoinTeam from './screens/jointeam'

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='pickteam' element={<PickTeam />} />
            <Route path='createteam' element={<CreateTeam />} />
            <Route path='main' element={<Main />} />
            <Route path='join' element={<JoinTeam />} />

            <Route
              path="*"
              element={<h1>There's nothing here!</h1>}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

