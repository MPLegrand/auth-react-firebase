import { createContext, useState, useEffect } from "react";
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth"
import {auth} from "../firebase-config"

//26:35 on cree un context
export const UserContext = createContext();

/**
 * Notre composant d'ordre superieur qui englobe les autres composants depuis props.children en leurs fournisant un context
 * Our higher order component that wraps other components from props.children by providing context
 */
export function UserContextProvider(props) {

    //47:37 on se cree un utilisateur
    const [currentUser, setCurrentUser] = useState();
    //47:57 le temps pour qu'on recoive une reponse depuis firebase
    const [loadingData, setLoadingData] = useState(true);

    /**
     * Methode permettant de s'inscrire
     * Method to registering
     */
    const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd);

    const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

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

    /**
     * Methode permettant de d'afficher ou non les modals signUp, signIn et logOut
     * Methode allowing to display or not the modals signUp, signIn or logOut
     */
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
        <UserContext.Provider value={{modalState, toggleModals, signUp, signIn, currentUser}}>
            { !loadingData && props.children }
        </UserContext.Provider>
    )
}