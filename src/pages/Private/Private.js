import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { Outlet, useLocation, Navigate } from 'react-router-dom'

export default function Private() {

    const { currentUser } = useContext(UserContext);

    console.log("PRIVATE", currentUser);

    /**
     * 1:01:00 Si currentUser est false (utilisateur non connecte) on renvoie a la page d'accueil
     * if currentUser is false (user not logged in) we return to the home page
     */
    if (!currentUser) {
        return <Navigate to="/" />
    }

  return (
    
    /**
     * <Outlet /> me permet de montrer le contenu de ma route imbrique/allows me to show the contents of my nested route
     * (<Route path="/private/private-home" element={<PrivateHome />} />) ici
     * 
     * <Outlet /> renders the child route's element (<Route path="/private/private-home" element={<PrivateHome />} />)
     */
    <div className="container">
        <Outlet />
    </div>
  )
}