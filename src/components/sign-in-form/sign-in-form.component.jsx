import { useState } from "react";
import { useDispatch } from "react-redux";


import FormInput from "../../components/form-input/form-input.component";
import Button, {
  BUTTON_TYPES_CLASSES,
} from "../../components/button/button.component";

import { ButtonContainer, SignUpContainer } from "./sign-in-form.styles";
import { googleSignInStart,emailSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart())
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email,password));
      setFormFields(defaultFormFields);
    } catch (err) {
      // switch (err.code) {
      //   case "auth/wrong-password":
      //     alert("Incorrect Password or Email");
      //     break;
      //   case "auth/user-not-found":
      //     alert("No user associated with this email");
      //     break;
      //   default:
      //     console.log(err);
      // }
      // if (err.code === "auth/wrong-password") return;
      console.log(err)
    }
  };
  return (
    <SignUpContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={password}
        />

        <ButtonContainer>
          <Button buttonType={BUTTON_TYPES_CLASSES.base} type="submit">
            Sign In
          </Button>
          <Button
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPES_CLASSES.google}
            type="button">
            Google Sign In
          </Button>
        </ButtonContainer>
      </form>
    </SignUpContainer>
  );
};

export default SignInForm;
