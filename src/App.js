import React, {useReducer} from "react";

import Join from "./components/Join/Join";
import socket from "./features/socket";






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
            default:
                return state
        }

    }
    const [state,dispatch] = useReducer(reducer, {
        joined: false,
        roomId: null,
        userName: null,
    });
    const onLogin = (obj) => {
        dispatch({
            type: "JOINED",
            payload: obj,
        });
        socket.emit("ROOM:JOIN",obj);
    }
    console.log(state);
  return (
    <div className="App">
        {!state.joined && <Join onLogin={onLogin}/>}
    </div>
  );
}

export default App;
