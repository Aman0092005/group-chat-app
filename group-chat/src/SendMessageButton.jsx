








function SendMessageButton({input,setInput,sendingMessage})
{

    return (
        <div className="inner-right-box-send-container">
            <input type="text" name="" id="" placeholder="Write a message..." value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={() => sendingMessage()} >Send</button>
        </div>
    );
}





export default SendMessageButton;