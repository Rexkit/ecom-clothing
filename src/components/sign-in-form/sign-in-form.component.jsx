import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: "",
  password: ""
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      setFormFields(defaultFormFields);
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("User not found");
          break;
        case "auth/wrong-password":
          alert("Wrong password");
          break;
        default:
          alert("Something went wrong");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" required name="email" id="email" onChange={handleChange} value={email} />
        <FormInput label="Password" type="password" required name="password" id="password" onChange={handleChange} value={password} />

        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType={'google'} onClick={signInWithGoogle}>Google sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;