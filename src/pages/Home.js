import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'

function Home() {

  const { currentUser } = useContext(UserContext);

  return (
    <div className="conatainer p-5">
        <h1 className="display-2 text-light">
            {!currentUser ? "Welcome buddy" : "Hi, Sign Up or Sign In"}
        </h1>
    </div>
  )
}

export default Home;