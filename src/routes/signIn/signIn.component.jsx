import React from 'react'
import { signInWithGooglePopup, getUserDocumentFromAuth } from '../../utils/firebase/firebase.utils' 

const SignIn = () => {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await getUserDocumentFromAuth(user)
  }
  return (
    <div>
        <h1>Sign In Page</h1>
        <button onClick={logGoogleUser}>LogIn</button>
    </div>
  )
}

export default SignIn