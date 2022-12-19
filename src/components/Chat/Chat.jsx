import React from 'react';

const Chat = ({users,messages}) => {
    console.log(users);
    return (
        <div>
            <h1>Онлайн: {users.length}</h1>
            <h2>Юзеры</h2>
            <ul>
                {users.map((u,index) => {
                    return (
                        <li key={u + index}>{u}</li>
                    )
                })}
            </ul>
        </div>
    );
};

export default Chat;