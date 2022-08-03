import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';

export default function SignUpModal() {

    /**
     * 32:37 on instentie notre contexte et on recupere ce qu'on veut
     * we initialize our context and we get what we want
     */
    const { modalState, toggleModals, signUp } = useContext(UserContext);

    const navigate = useNavigate();

    const [valadation, setValidation] = useState('');

    //40:00 on cree un tableau de reference pour les inputs/we create a reference table for the inputs
    const inputs = useRef([])
    //40:00 on cree une fonction qui va remplir le tableau/we create a function that will fill the array
    const addInputs = el => {
        /**
         *si l'element existe et qu'il n'est pas deja dans mon tableau, on le rajoute dedans 
         *if the element exists and it is not already in my array, we add it inside
         */
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el);
        }
    }
    
    const formRef = useRef();

    const handleForm = async (e) => {
        e.preventDefault();

        //on verifie si le password a 6 carractere min/we check if the password has at least 6 characters
        if((inputs.current[1].value.length < 6 || inputs.current[2].value.length < 6)){
            setValidation("6 carractere min");
            return;
        }
        //on verifie que le password est le meme/we check that the password is the same
        else if(inputs.current[1].value !== inputs.current[2].value){
            setValidation("Password to not match");
            return;
        }

        try {
            
            const cred = await signUp(
                inputs.current[0].value,
                inputs.current[1].value
            )
            // console.log(cred);
            
            //51:38 on remet notre formulaire a zero/we reset our form
            formRef.current.reset()
            setValidation("")
            
            //01:10:33 on ferme la modal avant la navigation/we close the modal before the navigation
            toggleModals("close")

            //une fois qu'on est connecter, on navige vers.../Once you are connected, you navigate to
            navigate("/private/private-home");

        } catch (error) {

            //54:00 on recupere et on traite l'erreur renvoye par firebase
            if (error.code === "auth/invalid-email") {
                setValidation("Email format invalid")               
            }

            if (error.code === "auth/email-already-in-use") {
                setValidation("Email already used")               
            }
        }
    }

    const closeModal = () => {
        setValidation("")
        toggleModals("close")
    }

  return (
    <>
        {modalState.SignUpModal && (
            <div className="position-fixed top-0 vw-100 vh-100">
                {/* notre overlay qui sert a rajouter un fond sombre/Our overlay which is used to add a dark background */}
                <div 
                onClick={closeModal} 
                className="w-100 h-100 bg-dark bg-opacity-75">
                </div>
                    <div className="position-absolute top-50 start-50 translate-middle" style={{minWidth: '400px'}}>
                        <div className="modal-dialog">

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Sign Up</h5>
                                    <button onClick={closeModal} className="btn-close"></button>
                                </div>
                                <div className="modal-body">
                                    <form ref={formRef} onSubmit={handleForm} className="sign-up-form">
                                        <div className="mb-3">
                                            <label htmlFor="signUpEmail" className="form-label">Email address</label>
                                            <input ref={addInputs} name="email" required type="email" 
                                            className="form-control" id='signUpEmail'/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="signUpPwd" className="form-label">Password</label>
                                            <input ref={addInputs} name="pwd" required type="password" 
                                            className="form-control" id='signUpPwd'/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="repeatPwd" className="form-label">Repeat Password</label>
                                            <input ref={addInputs} name="pwd" required type="password" 
                                            className="form-control" id='repeatPwd'/>
                                        </div>
                                        <p className="text-danger mt-1">{valadation}</p>
                                        <button className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )}
    </>
  )
}