








function ChatHeader({clearBtn})
{

    return (
        <div className="inner-right-box-header">
            <div className="box-header-inner">
                <img src="https://picsum.photos/200" alt="Random image" />
                <p>World Chat</p>
            </div>
            <button onClick={() => clearBtn()}>Clear all</button>
        </div>
    );
}




export default ChatHeader;