// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'



import Nav from "./Nav";
import MainBox from "./MainBox";
import Signup from "./Signup";
import { useState, useEffect } from "react";
import { createSocket } from "./socket";



let socket;
// let currentUser;
// let userName;
// let country;

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [nam, setNam] = useState('');
  const [countryName, setCountryName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [avtar, setAvtar] = useState('1');
  const [isAuth, setIsAuth] = useState(false);

  const [currentUser, setCurrentUser] = useState('');
  const [userName, setUserName] = useState('');
  const [country, setCountry] = useState('');

  const [isLogin, setIsLogin] = useState(true);

  const [usersOnlineCount, setUsersOnlineCount] = useState(0);
  const [userOnline,setUsersOnline] = useState([]);

  useEffect(() => {
    const handleSubmit = async () => {

      const res = await fetch("https://group-chat-backend-ap6w.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, nam, countryName, email, password, avtar, isLogin })
      });

      const data = await res.json();
      // console.log(data);
      if (data.isProblem) {
        // if account creation failed
        // setIsAuthenticated(false);
      } else {
        // if account created successfully
        setCurrentUser(data.userId);
        setUserName(data.name);
        setCountry(data.country);
        setAvtar(data.icon);
        setIsAuthenticated(true);
      }
    };
    if (isAuth) {
      handleSubmit();
      setUsers(prev => [...prev, { userId: userId, email: email, password: password }]);
      setUserId('');
      setNam('');
      setCountryName('');
      setEmail('');
      setPassword('');
      setIsAuth(false);
    }

  }, [isAuth]);

  useEffect(() => {

    if (isAuthenticated) {
      // currentUser = Math.floor(Math.random() * 10);
      // console.log(currentUser);
      const user = {
        userId: currentUser
      }
      socket = createSocket(user);
      setIsConnected(true);

      socket.on("connect", () => {
        console.log("connected");
      });
      socket.on("disconnect", () => {
        console.log("Disconnect");
      });

      socket.on("chat message", (msg) => {
        // console.log(msg);
        setMessages((prev => [...prev, msg]));
      });
      socket.on("usersOnlineCount", (count) => {
        console.log(count);
        setUsersOnlineCount(count.onlineUsersCount);
        setUsersOnline(count.onlineUsers);
      });
      // socket.on("onlineUsers", (onlineUsers) => {
      //   console.log(onlineUsers);
      // });

      return () => {
        socket.off("connect");
        socket.off("chat message");
        socket.off("usersOnlineCount");
        socket.off("disconnect");
      }
    }

  }, [isAuthenticated]);

  function sendingMessage() {
    socket.emit("chat message", { msg: input, senderId: currentUser, userName:userName});
    setInput('');
  }

  function logoutHandler()
  {
    setMessages([]);
    setIsAuthenticated(false);
    socket.off("connect");
    socket.off("chat message");
    socket.off("usersOnlineCount");
    socket.off("disconnect");
    socket.disconnect();
  }



  return (
    isAuthenticated ? <div>
      <Nav logoutHandler={logoutHandler} />
      <MainBox
        input={input}
        setInput={setInput}
        sendingMessage={sendingMessage}
        messages={messages}
        currentUser={currentUser}
        userName={userName}
        country={country}
        avtar={avtar}
        usersOnlineCount={usersOnlineCount}
        userOnline={userOnline}
      />
    </div> : <Signup
      userId={userId}
      nam={nam}
      countryName={countryName}
      email={email}
      password={password}
      setUserId={setUserId}
      setNam={setNam}
      setCountryName={setCountryName}
      setEmail={setEmail}
      setPassword={setPassword}
      avtar={avtar}
      setAvtar={setAvtar}
      setIsAuth={setIsAuth}
      isLogin={isLogin}
      setIsLogin={setIsLogin}
    />
  );
}




export default App;