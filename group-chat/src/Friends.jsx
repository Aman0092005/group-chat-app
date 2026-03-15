
import Users from "./Users";


//temporary
let friends = [{name:"Aman",country:"India"},{name:"Shubham",country:"Nepal"},{name:"David",country:"USA"},{name:"Jhon",country:"UK"}];



function Friends()
{

    return (
        <div className="inner-left-friends">
            <p className="inner-left-friends-tag">Friends*</p>
            {/* <div className="users-container">
                {friends.map((user,i) => <Users name={user.name} country={user.country} key={i} />)}
                
            </div> */}
            <div>
                <p>No friends yet...</p>
            </div>
        </div>
    );
}



export default Friends;