import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom';

export default function SignUpModal() {

    const { modalState, toggleModals, signIn } = useContext(UserContext);

    const navigate = useNavigate();

    const [valadation, setValidation] = useState('');

    //40:00 on cree un tableau de reference pour les inputs
    const inputs = useRef([])
    //40:00 on cree une fonction qui va remplir le tableau
    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el);
        }
    }
    
    const formRef = useRef();

    const handleForm = async (e) => {
        e.preventDefault();

        try {
            
            const cred = await signIn(
                inputs.current[0].value,
                inputs.current[1].value
            )
            
            //51:38 on remet notre formulaire a zero/we reset our form
            //formRef.current.reset()
            setValidation("")
            
            //01:10:33 on ferme la modal avant la navigation/we close the modal before the navigation
            toggleModals("close")

            // console.log(cred);
            //une fois qu'on est connecter, on navige vers.../Once you are connected, you navigate to
            navigate("/private/private-home");

        } catch (error) {

            //54:00 on recupere et on traite l'erreur renvoye par firebase
            // if (error.code === "auth/invalid-email") {
            //     setValidation("Email format invalid")               
            // }

            // if (error.code === "auth/email-already-in-use") {
            //     setValidation("Email already used")               
            // }

            console.log(error)
            setValidation("Wopsy, email and/or password are incorrect")
        }
    }

    const closeModal = () => {
        setValidation("")
        toggleModals("close")
    }

  return (
    <>
        {modalState.SignInModal && (
            <div className="position-fixed top-0 vw-100 vh-100">
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
                                            <label htmlFor="signInEmail" className="form-label">Email address</label>
                                            <input ref={addInputs} name="email" required type="email" 
                                            className="form-control" id='signInEmail'/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="signInPwd" className="form-label">Password</label>
                                            <input ref={addInputs} name="pwd" required type="password" 
                                            className="form-control" id='signInPwd'/>
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