import React, { useState, useEffect } from 'react';
import { User } from '../../../../App'; 
import { db } from '../../../../firebaseConfig';
import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore'; 
import './LoockStyle.css'

interface ListItem {
  name: string;
  importance: string;  
  data: string;        
  description: string; 
}

interface LoockListsProps {
  userData: User | null;
}

const LoockLists: React.FC<LoockListsProps> = ({ userData }) => {
  const [log, setLog] = useState<any>([]);

  useEffect(() => {
    console.log(log); 
  }, [log]);

  const loadLists = async () => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(
        usersRef,
        where('email', '==', userData?.email),
        where('pass', '==', userData?.pass)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert('Пользователь не найден!');
        throw new Error('Пользователь не найден!');
      }

      querySnapshot.forEach((doc: DocumentData) => {
        const userDatas = doc.data();
        setLog(userDatas);
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className='lists-container'>
      <h1>My Lists</h1>
      {log?.lists && log.lists.length > 0 ? (
        log.lists.map((item: ListItem, index: number) => (
          <div key={index} className='list-item'>
            <h3 className='item-name'>{item.name}</h3>
            <p className='item-importance'>Importance: <span>{item.importance}</span></p>
            <p className='item-data'>Date: <span>{item.data}</span></p>
            <p className='item-description'>Description: <span>{item.description}</span></p>
          </div>
        ))
      ) : (
        <p>No items found.</p>
      )}
      <button className='load-button' onClick={loadLists}>Load Lists</button>
    </div>
  );
};

export default LoockLists;
