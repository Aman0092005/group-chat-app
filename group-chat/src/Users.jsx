





function Users({name,country,avtar})
{


    return (
        <div className="users">
            <img src={`./img/avtar${avtar}.png`} alt="Random image" />
            <div className="users-text">
                <p className="users-name">{name}</p>
                <p className="users-country">{country}</p>
            </div>
        </div>
    );
}



export default Users;