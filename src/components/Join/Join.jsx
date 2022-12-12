import React, {useState} from 'react';
import './style.css'
import axios from "axios";





const Join = ({hello}) => {
    const [roomId,setRoomId] = useState("");
    const [userName,setUserName] = useState("");
    const onEnter = () => {
        if(!userName || !roomId) {
            alert("Введите данные")
        }
        axios.post("/rooms", {
            roomId,
            userName
        })
    }
    return (
        <div className='wrapper'>
            <div className="joinBlock">
                <input onChange={e => setRoomId(e.target.value)} type="text" placeholder='Room ID' value={roomId}/>
                <input onChange={e => setUserName(e.target.value)} type="text" placeholder='Ваше имя' value={userName}/>
                <button onClick={onEnter} className="btn btn-success">ВОЙТИ</button>
            </div>
        </div>
    );
};

export default Join;