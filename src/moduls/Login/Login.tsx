import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import {useNavigate} from 'react-router-dom'
import './Login.css'
import { v4 as uuidv4 } from 'uuid';
import {RegCompleateType,User} from '../../App'


interface LoginProps {
    regist: boolean;
    setRegist: React.Dispatch<React.SetStateAction<boolean>>;
    setRegCompleate: React.Dispatch<React.SetStateAction<RegCompleateType>>;
    regCompleate: RegCompleateType;
    setUserData:React.Dispatch<React.SetStateAction<User | null>>
  }



const Login: React.FC<LoginProps> = ({ setRegist, regist ,setRegCompleate,regCompleate,setUserData}) => {

  const url = `https://firestore.googleapis.com/v1/projects/users-279b7/databases/(default)/documents/users`;
  const [user, setUser] = useState<User>({
    email: '',
    pass: '',
    id:'',
    lists:[],
  });



  const navigate = useNavigate()

  useEffect(() =>{
    if(regCompleate){
      navigate('/Blocknote')
    }
  })


  const AddUser = async () => {
    if (!user.pass || !user.email) {
        alert('Не все поля заполнены!');
        return;
    }

 
    const userId = user.email.replace(/[@.]/g, "_");

    const data = {
        fields: {
            email: { stringValue: user.email },
            pass: { stringValue: user.pass },
            id:{stringValue:uuidv4()},
            lists:{arrayValue: { values: [] }}
        },
    };

    try {
        const res = await fetch(`${url}/${userId}`, {  
            method: "PATCH",  
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            alert("User add")
            console.log("Document written with ID: ", userId);
        }

        setUser({
            email: '',
            pass: '',
            id:'',
            lists:[],
        });
    } catch (error) {
        console.log('Error:', error);
    }
};

const LoockUser = async () => {
  if (!user.pass || !user.email) {
    alert('Не все поля заполнены!');
    return;
  }

  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef,
      where('email', '==', user.email),
      where('pass', '==', user.pass)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert('Пользователь не найден!');
      throw new Error('Пользователь не найден!');
    }

    querySnapshot.forEach((doc) => {
      const userData = doc.data(); 
           
      setUserData({
        email: userData.email,
        pass: userData.pass,
        id: doc.id, 
        lists:userData.lists, 
      });

      alert("Пользователь найден!");
      setRegCompleate(!regCompleate);
    });

  } catch (error) {
    console.log('Ошибка при запросе:', error);
  }
};


  const Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
        { regist?(<div className="Login-window">
                <h1>Login</h1>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={user.email} onChange={Change} placeholder="Email" />
          
                <label htmlFor="pass">Пароль</label>
                <input type="password"name="pass" value={user.pass} onChange={Change} placeholder="Пароль" />
                <button onClick={LoockUser}>Login</button>
                <p onClick={() => setRegist(!regist)}>go to Registration</p>
          </div>):(<div className="Login-window" >
                <h1>Registration</h1>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={user.email} onChange={Change} placeholder="Email" />

                <label htmlFor="pass">Пароль</label>
                <input type="password"name="pass" value={user.pass} onChange={Change} placeholder="Пароль" />
                <button onClick={AddUser}>Register</button>
                <p onClick={() => setRegist(!regist)}>go to Login</p>
            </div>)
        }
    </div>
  );
};

export default Login;
