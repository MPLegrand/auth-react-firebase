import { createContext, useState, useEffect } from "react";
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth"
import {auth} from "../firebase-config"

export const UserContext = createContext();

export function UserContextProvider(props) {

    //47:37 on se cree un utilisateur
    const [currentUser, setCurrentUser] = useState();
    //47:57 le temps pour qu'on recoive une reponse depuis firebase
    const [loadingData, setLoadingData] = useState(true);

    const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser);
            setLoadingData(false);
        })
        
        return unsubscribe;
        
    }, [])

    // Modal
    const [modalState, setModalState] = useState({
        SignUpModal: false,
        SignInModal: false
    })

    const toggleModals = modal => {
        if (modal === "signIn") {
            setModalState({
                SignUpModal: false,
                SignInModal: true
            })
        }
        if (modal === "signUp") {
            setModalState({
                SignUpModal: true,
                SignInModal: false
            })
        }
        if (modal === "close") {
            setModalState({
                SignUpModal: false,
                SignInModal: false
            })
        }
    }

    return (
        <UserContext.Provider value={{modalState, toggleModals, signUp, currentUser}}>
            { !loadingData && props.children }
        </UserContext.Provider>
    )
}