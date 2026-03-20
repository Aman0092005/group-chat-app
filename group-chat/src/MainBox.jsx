

import SearchBtn from "./SearchBtn";
import PeopleOnline from "./PeopleOnline";
import Friends from "./Friends";
import ChatHeader from "./ChatHeader";
import ChatMain from "./ChatMain";
import SendMessageButton from "./SendMessageButton";


function MainBox({input,setInput,sendingMessage,messages,currentUser,userName,country,avtar,usersOnlineCount,userOnline,clearBtn})
{

    return (
        <div className="main-box">
            <div className="inner-left-box">
                <SearchBtn />
                <PeopleOnline avtar={avtar} userName={userName} country={country} usersOnlineCount={usersOnlineCount} userOnline={userOnline} />
                {/* <Friends /> */}
            </div>
            <div className="inner-right-box">
                <ChatHeader clearBtn={clearBtn} />
                <ChatMain messages={messages} currentUser={currentUser} />
                <SendMessageButton input={input} setInput={setInput} sendingMessage={sendingMessage} />
            </div>
        </div>
    );
}



export default MainBox;