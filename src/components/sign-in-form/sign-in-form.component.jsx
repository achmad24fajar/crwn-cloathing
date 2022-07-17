import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import {
  auth,
  signInWithGooglePopup,
  getUserDocumentFromAuth,
  signInWithGoogleRedirect,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';
import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignIn = () => {
  const dispatch = useDispatch()
  const [formField, setFormField] = useState(defaultFormFields);
  const { email, password } = formField;

  console.log(formField);

  const logGoogleUser = async () => {
    dispatch(googleSignInStart())
  };

  const resetFormField = () => {
    setFormField(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormField()
    } catch (err) {
      switch(err.message){
        case 'Firebase: Error (auth/wrong-password).':
          alert('Your password is wrong!')
          break;
        case 'Firebase: Error (auth/user-not-found).':
          alert('Your email does not match');
          break;

        default:
          console.log(err.message)
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      {/* <button onClick={logGoogleUser}>Sign in with googke popup</button> */}
      <h2>Already have an account</h2>
      <span>Sign in with your email and password.</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />

        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
