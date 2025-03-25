import React ,{FC}from "react";
import './Header.css'
import { useNavigate } from "react-router-dom";
import { User } from '../../App'

type HeaderProps ={
    setLoock:React.Dispatch<React.SetStateAction<boolean>>
    loock:boolean
    userData:User | null
}



const Header: React.FC<HeaderProps> = ({setLoock,loock,userData}) =>{

    const navigate = useNavigate()


    const email = userData ? userData.email : 'Gmail';



    return (
        <header className="headers">
          <h1 className="headers-email">{email}</h1>
          <ul className="List">
            <li onClick={() => setLoock(true)}>
              add
            </li>
            <li onClick={() => setLoock(false)}>
              loock
            </li>
          </ul>
          <h1 onClick={() => navigate('/')}>Logaut</h1>
        </header>
      );
    
}

export default Header