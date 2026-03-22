import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import cors from "cors";

import { Pool } from 'pg';
import { isPromise } from "node:util/types";
// const { Pool } = pkg;
import bcrypt from "bcrypt";






const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});



app.use(cors());


app.use(express.json());


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
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
        // console.log(msg);
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
    let again = false;
    for(let i=0;i<onlineUsers.length;i++)
    {
        if(onlineUsers[i].user_id === req.body.userId)
        {
            again = true;
        }
    }
    if(again)
        res.json({isProblem: true, msg: "User already login"});
    else if (!req.body.isLogin) {
        const data = await pool.query("SELECT * FROM users WHERE $1 = user_id OR $2 = email", [req.body.userId, req.body.email]);
        if (data.rows.length > 0) {
            res.json({ isProblem: true });
        }
        else {
            const data = await pool.query("INSERT INTO users(user_id,email,password,name,country,icon) VALUES($1,$2,$3,$4,$5,$6) RETURNING *", [req.body.userId, req.body.email,await hashPassword(req.body.password) , req.body.nam, req.body.countryName, req.body.avtar]);
            onlineUsers.push(data.rows[0]);
            res.json({ isProblem: false, userId: req.body.userId, name: req.body.nam, country: req.body.countryName, icon: req.body.avtar });
        }
    } else {
        const data = await pool.query("SELECT user_id,name,country,icon,password FROM users WHERE $1 = user_id AND $2 = email", [req.body.userId, req.body.email,]);
        if (data.rows.length <= 0)
            res.json({ isProblem: true });
        else
        {
            const isPasswordCorrect = await compareHash(req.body.password,data.rows[0].password);
            if(!isPasswordCorrect)
                res.json({isProblem: true});
            else
            {
                onlineUsers.push(data.rows[0]);
                res.json({ isProblem: false, userId: data.rows[0].user_id, name: data.rows[0].name, icon: data.rows[0].icon, country: data.rows[0].country });
            }
        }
    }
});


//temporary
// app.get("/temp",(req,res) => {
//     hashPassword("amansingh");
//     res.json({name:"Aman Kumar"});
// })


server.listen(PORT, () => {
    console.log("Server running on", PORT);
});








//fucntions
async function hashPassword(password)
{
    const salt = await bcrypt.genSalt(10);
    const hash =  await bcrypt.hash(password,salt);
    return hash;
}
async function compareHash(password,hashPassword)
{
    const result = await bcrypt.compare(password,hashPassword)
    return result;
}