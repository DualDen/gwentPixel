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
    res.json([...rooms.values()]);
})

io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', (data) => {
        console.log(data);
    })

    console.log('user connected', socket.id);
})

server.listen(9999, (err) => {
    if (err) {
        throw Error(err)
    }
    console.log('Сервер запущен')
});