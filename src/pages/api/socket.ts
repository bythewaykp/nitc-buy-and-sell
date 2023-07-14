import { Server } from "socket.io";

export default function (req, res) {
    try {
        if (res.socket.server.io) {
        } else {
            const io = new Server(res.socket.server, {
                path: "/api/socket_io",
                addTrailingSlash: false,
            });

            res.socket.server.io = io;

            io.on("connection", (socket) => {
                Handler(socket, io);
                let address = socket.handshake.address;
                console.log(
                    `Number of clients : ${io.engine.clientsCount}. ${socket.id} with ${address} connected`
                );
            });
        }
        res.end();
        return;
    } catch (err) {
        console.log(err);
    }
}

let Handler = async (socket, io) => {
    socket.on("disconnecting", (reason) => {
        let address = socket.handshake.address;
        console.log(
            `Number of clients : ${io.engine.clientsCount}. ${socket.id} with ${address} disconnected`
        );
    });

    socket.on("test-s", (v: string) => {
        console.log("received from client - ", v);
        socket.emit("test-c", "item from server");
    });
};
