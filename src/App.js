import React, {useEffect, useReducer} from "react";

import Join from "./components/Join/Join";
import socket from "./features/socket";
import Chat from "./components/Chat/Chat";






function App() {
    const reducer = (state,action) => {
        switch (action.type) {
            case "JOINED":
                return {
                    ...state,
                    joined: true,
                    userName: action.payload.userName,
                    roomId: action.payload.roomId,

                }
            case "SET_USERS":
                return {
                    ...state,
                    users: action.payload,
                }
            case "SET_MESSAGES":
                return {
                    ...state,
                    messages: action.payload,
                }
            default:
                return state
        }

    }
    const [state,dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: [],
    });
    const onLogin = (obj) => {
        dispatch({
            type: "JOINED",
            payload: obj,
        });
        socket.emit("ROOM:JOIN",obj);
    };
    const setUsers = (users) => {
        dispatch({
            type: "SET_USERS",
            payload: users,
        })
    }
    useEffect(() => {
        socket.on('ROOM:JOINED',setUsers);
        socket.on('ROOM:SET_USERS',setUsers)
    },[])
    window.socket = socket;
  return (
    <div className="App">
        {!state.joined ? <Join onLogin={onLogin}/> : <Chat {...state}/>}
    </div>
  );
}

export default App;
