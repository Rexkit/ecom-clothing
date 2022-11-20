import { useState, ChangeEvent, FormEvent } from 'react';
import { AuthErrorCodes, AuthError } from 'firebase/auth';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { SignUpContainer } from './sign-up-form.styles';
import { useDispatch } from 'react-redux';

import { signUpStart } from '../../store/user/user.action';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));

      setFormFields(defaultFormFields);
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('Email already in use');
      }

      console.error(error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          required
          name='displayName'
          id='displayName'
          onChange={handleChange}
          value={displayName}
        />
        <FormInput
          label='Email'
          type='email'
          required
          name='email'
          id='email'
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label='Password'
          type='password'
          required
          name='password'
          id='password'
          onChange={handleChange}
          value={password}
        />
        <FormInput
          label='Confirm password'
          type='password'
          required
          name='confirmPassword'
          id='confirmPassword'
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button type='submit'>Sign up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
