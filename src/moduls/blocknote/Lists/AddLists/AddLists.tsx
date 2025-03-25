import React, { useState } from "react";
import './AddListsStyle.css'
import { User } from '../../../../App'
import { db } from '../../../../firebaseConfig'; 
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export type newListType = {
    name: string;
    data: string;
    description: string;
    importance: string;
}

interface AddListsProps {
    userData: User | null;
}

const AddLists: React.FC<AddListsProps> = ({ userData }) => {
    const [newList, setNewList] = useState<newListType>({
        name: '',
        data: '',
        description: '',
        importance: '',
    });

    const Change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewList(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const PushNewData = async () => {
        if (!userData) {
            console.error("Ошибка: userData не найден");
            return;
        }

        try {
            const docRef = doc(db, 'users', userData.id);
            
            await updateDoc(docRef, {
                lists: arrayUnion(newList) 
            });

            setNewList({
                name: '',
                data: '',
                description: '',
                importance: '',
            });

            console.log("Данные успешно отправлены!");

        } catch (error) {
            console.log('Ошибка:', error);
        }
    };

    return (
        <div className="add-form-container">
            <h1>Add List</h1>
            <form className="add-form">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={newList.name} placeholder="Enter Name" onChange={Change} className="form-input" />
                    
                <label htmlFor="data">Date</label>
                <input type="date" name="data" value={newList.data} onChange={Change} className="form-input" />
    
                <label htmlFor="description">Description</label>
                <input type="text" name="description" value={newList.description} placeholder="Enter Description" onChange={Change} className="form-input" />
    
                <label htmlFor="importance">Importance</label>
                <select name="importance" value={newList.importance} onChange={Change} className="form-input">
                    <option value="">Select Importance</option>
                    <option value="not-important">Not Important</option>
                    <option value="important">Important</option>
                    <option value="very-important">Very Important</option>
                </select>           
            </form>
            <button onClick={PushNewData} className="submit-button">Submit</button>    
        </div>
    );
}

export default AddLists;
