import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { Link } from "react-router-dom";


export default function NavBar() {

const {modalState, toggleModals} = useContext(UserContext);

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
            <button onClick={() => toggleModals("signUp")} className="btn btn-danger ms-2">
                Log Out
            </button>
        </div>
    </div>
  )
}
