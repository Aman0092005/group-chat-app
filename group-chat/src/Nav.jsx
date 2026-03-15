







function Nav({logoutHandler})
{


    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <img src="./img/logo.png" alt="Logo" />
                <p>ChatGroup</p>
            </div>
            <button onClick={() => logoutHandler()}>Logout</button>
        </nav>
    );
}



export default Nav;