import React, { useEffect, useState } from "react";
import Header from '../Header/Header'

import AddLists from "./Lists/AddLists/AddLists";
import LoockLists from "./Lists/LoockLists/LoockLists";

import {User} from '../../App'

interface BlocknoteProps {
    userData: User | null;
  }

const Blocknote:React.FC<BlocknoteProps> = ({userData}) =>{
    const [loock,setLoock] = useState<boolean>(false)



    const url = `https://firestore.googleapis.com/v1/projects/users-279b7/databases/(default)/documents/users/${userData?.id}/items`;


    return(
        <>  
            <div className="Header">
                <Header loock={loock} setLoock={setLoock}  userData={userData}/>
            </div>
            {loock? <AddLists userData={userData}/>:<LoockLists userData={userData} />}
        </>
     
    )
}


export default Blocknote
