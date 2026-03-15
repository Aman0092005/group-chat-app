

import Users from "./Users";

//temporary
let onlines = [{name:"Ansh",country:"Uganda"},{name:"Abhishek",country:"Nigeria"},{name:"Daksh",country:"Japan"},{name:"Abhay",country:"Ukraine"}];


function PeopleOnline({avtar,userName,country,usersOnlineCount,userOnline})
{

    return (
        <div className="inner-left-onlines">
            <p className="inner-left-onlines-tag">Onlines: {usersOnlineCount}</p>
            <div className="users-container">
                {/* <Users name={userName} country={country} avtar={avtar} /> */}
                {userOnline.map((user,i) => <Users name={user.name} country={user.country} key={i} avtar={user.icon} />)}
            </div>
        </div>
    );
}



export default PeopleOnline;