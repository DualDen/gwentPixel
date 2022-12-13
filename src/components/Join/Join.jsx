import React, {useState} from 'react';
import './style.css'
import axios from "axios";





const Join = ({onLogin}) => {
    const [roomId,setRoomId] = useState("");
    const [userName,setUserName] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const onEnter = async () =>  {
        if(!userName || !roomId) {
            alert("Введите данные")
        }
        const obj = {
            roomId,
            userName,
        }
        setIsLoading(true);
        await axios.post("/rooms", obj);
        onLogin(obj);
    }
    return (
        <div className='wrapper'>
            <div className="joinBlock">
                <input onChange={e => setRoomId(e.target.value)} type="text" placeholder='Room ID' value={roomId}/>
                <input onChange={e => setUserName(e.target.value)} type="text" placeholder='Ваше имя' value={userName}/>
                <button disabled={isLoading} onClick={onEnter} className="btn btn-success">{isLoading ? "ВХОД..." : "ВОЙТИ"}</button>
            </div>
        </div>
    );
};

export default Join;