import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import Login from './moduls/Login/Login';
import Blocknote from './moduls/blocknote/Blocknote';

export type User = {
  email: string;
  pass: string;
  id:string;
  lists:any
};

export type RegCompleateType = boolean;

function App() {
  const [regist, setRegist] = useState<boolean>(true);
  const [regCompleate,setRegCompleate] = useState<RegCompleateType>(false)
  const [userData,setUserData] = useState<User|null>(() =>{
    const savedUser = localStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : null;
  })

  useEffect(() =>{
    localStorage.setItem('userData', JSON.stringify(userData))
  },[userData])
  

  return (
        <Router>
          <Routes>
            <Route path='/' element={<Login regist={regist} setRegist={setRegist} regCompleate={regCompleate}  setRegCompleate={setRegCompleate} setUserData={setUserData} />} />
            <Route path='/Blocknote' element={<Blocknote userData={userData} />} />
          </Routes>
        </Router>

  );
}

export default App;
