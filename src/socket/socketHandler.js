const initializeSocket = (io) => {
    io.on('connection', (socket) => {
        console.log(`A user connected: ${socket.id}`);

        socket.on('setup', (userData) => {
            socket.join(userData._id);
            console.log(`User ${userData.name} (${userData._id}) connected and joined their room`);
            socket.emit('connected');
        })

        socket.on('join chat', (room) => {
            socket.join(room);
            console.log(`User ${socket.id} joined room: ${room}`);
        })

        socket.on("new message", (msg) => {
            let chat = msg.chat;

            if(!chat.users) return console.log("chat.users not defined");

            chat.users.forEach(user => {
                if(user._id === msg.sender._id) return;
            })

            socket.in(user._id).emit('message received', msg);
        })

        socket.on('disconnect', () => {
            console.log(`A user disconnected: ${socket.id}`);
        })

    })
}

export default initializeSocket;