import React from 'react';
import './style.css'
import socket from "../../features/socket";

const Join = ({hello}) => {
    return (
        <div className='wrapper'>
            <div className="joinBlock">
                <input type="text" placeholder='Room ID' defaultValue=''/>
                <input type="text" placeholder='Ваше имя' defaultValue=''/>
                <button onClick={() => {
                    socket();
                }} className="btn btn-success">ВОЙТИ</button>
            </div>
        </div>
    );
};

export default Join;