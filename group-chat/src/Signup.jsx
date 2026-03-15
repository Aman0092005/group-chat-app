import {useState} from "react";





function Signup({userId,nam,countryName,setCountryName,email,password,setUserId,setEmail,setNam,setPassword,avtar,setAvtar,setIsAuth,isLogin,setIsLogin})
{
    const [onEnter,setOnEnter] = useState('');

    function handleOnEnter(value)
    {
        setOnEnter(value);
    }
    function handleOnLeave()
    {
        setOnEnter('');
    }

    return (
        <div className="login-container">
            <div className="login-container-inner">
                <div className="login-img-container">
                    <img src="./img/login.png" alt="Login image" />
                </div>
                <div className="main-login">
                    <div className="main-login-inner">
                        <h2>Welcome</h2>
                        <p className="login-p">Start your chat with World...</p>
                        <form onSubmit={(e) => e.preventDefault()} >
                            <div className="form-inner">
                                <label htmlFor="">User Id</label>
                                <input type="text" name="userId" id="" className="inp" placeholder="Enter user id..." value={userId} onChange={(e) => setUserId(e.target.value)} required />
                            </div>
                            {!isLogin &&
                                <div className="form-inner">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" id="" className="inp" placeholder="Enter Name..." value={nam} onChange={(e) => setNam(e.target.value)} required />
                            </div>
                            }
                            { !isLogin &&
                                <div className="form-inner">
                                <label htmlFor="countryName">Country Name</label>
                                <input type="text" name="countryName" id="" className="inp" placeholder="Enter Country Name..." value={countryName} onChange={(e) => setCountryName(e.target.value)} required />
                            </div>
                            }
                            <div className="form-inner">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="" className="inp" placeholder="Enter email..." value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-inner">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="" className="inp" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <input type="submit" name="submit" id="" className="submit-btn" value={isLogin?"Login": "Sign up"} onClick={() => {setIsAuth(prev => !prev)}} />
                        </form>
                        <button onClick={() => setIsLogin(!isLogin)} className="sign-login-btn" >{isLogin?"Create Account": "Already have an Account?"}</button>
                        <div className="avtar" >
                            <div className="choose-avtar">
                                <p>Choose Your Avtar:</p>
                                <div className="avtar-container">
                                    <img src="./img/avtar1.png" alt="Avtar image 1" onClick={() => setAvtar('1')} onMouseEnter={() => setTimeout(() => handleOnEnter("1"),1000*0.5)} onMouseLeave={() => handleOnLeave()} />
                                    <img src="./img/avtar2.png" alt="Avtar image 1" onClick={() => setAvtar('2')} onMouseEnter={() => setTimeout(() => handleOnEnter("2"),1000*0.5)} onMouseLeave={() => handleOnLeave()} />
                                    <img src="./img/avtar3.png" alt="Avtar image 1" onClick={() => setAvtar('3')} onMouseEnter={() => setTimeout(() => handleOnEnter("3"),1000*0.5)} onMouseLeave={() => handleOnLeave()} />
                                </div>
                            </div>
                            <div className="current-avtar">
                                <p>Current Avtar:</p>
                                <div>
                                    <img src={`./img/avtar${onEnter || avtar}.png`} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}




export default Signup;