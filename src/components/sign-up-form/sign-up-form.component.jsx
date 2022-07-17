import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  auth,
  signInWithGooglePopup,
  getUserDocumentFromAuth,
  signInWithGoogleRedirect,
  createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import { signUpStart } from '../../store/user/user.action';

import './sign-up-form.styles.scss'
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUp = () => {
  const dispatch = useDispatch();
  const [formField, setFormField] = useState(defaultFormFields);
  const {displayName, email, password, confirmPassword} = formField;

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await getUserDocumentFromAuth(user);
  };

  const resetFormField = () => {
    setFormField(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword){
      alert('Password do not match!');
      return;
    }

    try{
      dispatch(signUpStart(email, password, displayName))
      resetFormField()
    } catch(err) {
      if(err.code == 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use');
      } else {
        console.log('error', err);
      }
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target
    setFormField({...formField, [name]: value})
  }

  return (
    <div className='sign-up-container'>
      {/* <button onClick={logGoogleUser}>Sign in with googke popup</button> */}
      <h2>I do not have an account</h2>
      <span>Sign up with your email and password.</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

        <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
