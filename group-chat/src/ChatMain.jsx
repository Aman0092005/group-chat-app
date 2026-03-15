import Message from "./Message";








function ChatMain({messages,currentUser})
{
    return (
        <div className="inner-right-box-chat-main">
            {/* <div>
                <img src="./img/chat.png" alt="Chat image" />
                <p>No messages yet. Start the conversation.</p>
            </div> */}
            {/* <Message pos={"left left-msg"} />
            <Message pos={"right right-msg"} /> */}

            {messages.map((message,index) => {
                const isMine = currentUser === message.senderId;
                console.log(currentUser,messages.senderId);

                return (
                    <Message 
                    pos={isMine? "right": "left"} 
                    msg={isMine? "right-msg": "left-msg"} 
                    msgN={isMine? "msg-name-r": "msg-name-l"} 
                    key={index} 
                    text={message.msg} 
                    userName={message.userName}
                    />
                );
            })}
        </div>
    );
}




export default ChatMain;