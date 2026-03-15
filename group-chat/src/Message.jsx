





function Message({pos,msg,msgN,text,userName})
{

    // return (
    //     <div className={pos}>
    //         <p>{text}</p>
    //     </div>
    // );
    return (
        <div className={pos}>
            <div className={msg}>
                <p>{text}</p>
            </div>
            <p className={msgN}>{userName}</p>
        </div>
    );
}


export default Message;