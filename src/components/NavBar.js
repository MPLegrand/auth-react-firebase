import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Link, useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';

export default function NavBar() {

const {modalState, toggleModals} = useContext(UserContext);

const navigate = useNavigate();

//01:13:00 fonction de deconnexion/disconnect function
const logOut = async () => {
    try {

        //on passe a signOut() auth (les informations d'authentification du fichier firebase-config)
        await signOut(auth);
        navigate("/");

    } catch (error) {
        alert("For some reasons we can't deconnect, please check your internet connection")
    }
}

  return (
    <div className="navbar navbar-light bg-light px-4">
        <Link to="/" className="navbar-brand">
            AuthJS
        </Link>
        <div>
            <button onClick={() => toggleModals("signUp")} className="btn btn-primary">
                Sign Up
            </button>
            <button onClick={() => toggleModals("signIn")} className="btn btn-primary ms-2">
                Sign In
            </button>
            <button onClick={logOut} className="btn btn-danger ms-2">
                Log Out
            </button>
        </div>
    </div>
  )
}
