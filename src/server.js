const express = require('express');
const app = express();

const server = require('http').Server(app);

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

app.use(express.json());
const rooms = new Map();


app.get("/rooms", (req, res) => {
    res.json(rooms);
});


app.post('/rooms', (req , res) => {
    const {roomId, userName} = req.body;
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []],
        ]));
    }
    res.send();
})

io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        socket.join(roomId);
        rooms.get(roomId).get('users').set(socket.id,userName);
        const users =  [...rooms.get(roomId).get('users').values()];
        socket.broadcast.to(roomId).emit("ROOM:JOINED",users);
    });
    socket.on("disconnected", () => {
        rooms.forEach((value,roomId) => {
            if(value.get('users').delete(socket.id)) {
                const users =  [...value.get('users').values()];
                socket.broadcast.to(roomId).emit("ROOM:SET_USERS",users);
            }
        });
    })

    console.log('user connected', socket.id);
})


server.listen(9999, (err) => {
    if (err) {
        throw Error(err)
    }
    console.log('Сервер запущен')
});