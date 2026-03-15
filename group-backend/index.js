import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import cors from "cors";

import { Pool } from 'pg';
// const { Pool } = pkg;







const app = express();

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Chatgroup",
    password: "missionspace",
    port: 5432,
});


app.use(cors({
    origin: "http://172.20.10.7:5173",
    methods: ["GET", "POST"]
}));


app.use(express.json());


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://172.20.10.7:5173",
        methods: ["GET", "POST"],
        credentials: true
    }
});


let onlineUsersCount = 0;
let onlineUsers = []

io.on("connection", (socket) => {
    // console.log("A user connected",socket.handshake.auth);

    // console.log(socket);

    // socket.on("connection", () => {
    // });
    onlineUsersCount++;
    io.emit("usersOnlineCount", {onlineUsersCount,onlineUsers});

    socket.on("chat message", (msg) => {
        console.log(msg);
        io.emit("chat message", msg);
    });


    // setInterval(() => {
    //     io.emit("usersOnlineCount",onlineUsers);
    // },10000);

    socket.on("disconnect", () => {
        onlineUsersCount--;
        
        onlineUsers = onlineUsers.filter((user) => user.user_id !== socket.handshake.auth.userId);
        io.emit("usersOnlineCount", {onlineUsersCount,onlineUsers});
    });
});



app.post("/signup", async (req, res) => {
    // console.log(req.body);
    // console.log(req.body.isLogin);
    if (!req.body.isLogin) {
        const data = await pool.query("SELECT * FROM users WHERE $1 = user_id OR $2 = email", [req.body.userId, req.body.email]);
        if (data.rows.length > 0) {
            res.json({ isProblem: true });
        }
        else {
            const data = await pool.query("INSERT INTO users(user_id,email,password,name,country,icon) VALUES($1,$2,$3,$4,$5,$6) RETURNING *", [req.body.userId, req.body.email, req.body.password, req.body.nam, req.body.countryName, req.body.avtar]);
            onlineUsers.push(data.rows[0]);
            res.json({ isProblem: false, userId: req.body.userId, name: req.body.nam, country: req.body.countryName, icon: req.body.avtar });
        }
    } else {
        const data = await pool.query("SELECT user_id,name,country,icon FROM users WHERE $1 = user_id AND $2 = email AND $3 = password", [req.body.userId, req.body.email, req.body.password]);
        if (data.rows.length <= 0)
            res.json({ isProblem: true });
        else
        {
            onlineUsers.push(data.rows[0]);
            res.json({ isProblem: false, userId: data.rows[0].user_id, name: data.rows[0].name, icon: data.rows[0].icon, country: data.rows[0].country });
        }
    }
});


server.listen(3000, () => {
    console.log("Server is Running");
});