import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../config/AuthContext';

function Navbar() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = async(e) => {
        e.preventDefault();
        try {
            await signOut(auth);
            navigate('/Homepage/Home');
        } catch (error) {
            alert(error);
        }
    }

    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top fixed-top bg-body-dark">
            <div className="container-fluid">
                <Link className="navbar-brand ms-5" to="/Homepage/Home"> <i class="fa-regular fa-address-card me-3 fs-26"></i> Make My Website</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse nav justify-content-start" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/Homepage/Home"> Home </Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/Components/About"> About </Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/Components/Contact"> Contact </Link>
                        </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse nav-justify-content-middle" id='navbarNavDropdown' 
                    style={{right: "0", margin: "0 0 0 700px"}}>
                    <div className="form-check form-switch" style={{margin: "0 5px"}}>
                        <input className="form-check-input text-light" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                    </div>
                    <div className="login-button w-40" style={{margin: "0 5px 0 5px"}}>
                    {user ? (
                        <>
                        <Link to={`/ProfilePage/ViewProfile/${user.uid}`} style={{textDecoration: "none", color: "white"}}> View Profile </Link>
                        <button className="btn btn-dark ms-3" onClick={handleSignOut}> <i class="fa fa-right-from-bracket" style={{color: "white", margin: "0 5px", fontSize: "30px"}}/> Logout </button>
                        </>
                        ): (
                        <>
                        <Link to={'/Authentication/Login1'} className="btn btn-success"> Login </Link>
                        </>
                        )
                    }   
                    </div>                
                </div>
            </div>
        </nav>            
        </>
    )
}

export default Navbar;
