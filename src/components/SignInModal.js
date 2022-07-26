import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../context/userContext'

export default function SignInModal() {

    const { modalState, toggleModals } = useContext(UserContext);

  return (
    <>
        {modalState.SignInModal && (
            <div className="position-fixed top-0 vw-100 vh-100">
                <div className="w-100 h-100 bg-dark bg-opacity-75">
                    <div className="position-absolute top-50 start-50 translate-middle" style={{minWidth: '400px'}}>
                        <div className="modal-dialog">

                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Sign In</h5>
                                    <button onClick={() => toggleModals("close")} className="btn-close"></button>
                                </div>
                                <div className="modal-body">
                                    <form className="sign-up-form">
                                        <div className="mb-3">
                                            <label htmlFor="signUpEmail" className="form-label">Email address</label>
                                            <input name="email" required type="email" 
                                            className="form-control" id='signUpEmail'/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="signUpPwd" className="form-label">Password</label>
                                            <input name="pwd" required type="password" 
                                            className="form-control" id='signUpPwd'/>
                                        </div>
                                        <p className="text-danger mt-1">Validation</p>
                                        <button className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}
