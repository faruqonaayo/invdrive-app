import { useReducer, useState } from "react";
import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import Form from "../../components/Form/Form";
import Button from "../../components/Button/Button";
import styles from "./Auth.module.css";

const initialState = {
  formType: "login",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  cPassword: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "formChange": {
      const currentForm = state.formType;
      let nextForm;
      if (currentForm === "signup") {
        nextForm = "login";
      } else {
        nextForm = "signup";
      }

      return { ...state, formType: nextForm };
    }
    case "firstName":
      return { ...state, firstName: action.payload };
    case "lastName":
      return { ...state, lastName: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "cPassword":
      return { ...state, cPassword: action.payload };
    default:
      return state;
  }
}
export default function Auth() {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { formType, firstName, lastName, email, password, cPassword } =
    formState;

  const [errorMessage, setErrorMessage] = useState("hello");
  const [successMessage, setSuccessMessage] = useState("hi");

  function handleFormChange() {
    dispatch({ type: "formChange" });
  }
  function handleFirstNameChange(e) {
    dispatch({ type: "firstName", payload: e.target.value });
  }
  function handleLastNameChange(e) {
    dispatch({ type: "lastName", payload: e.target.value });
  }
  function handleEmailChange(e) {
    dispatch({ type: "email", payload: e.target.value });
  }
  function handlePasswordChange(e) {
    dispatch({ type: "password", payload: e.target.value });
  }
  function handleCPasswordChange(e) {
    dispatch({ type: "cPassword", payload: e.target.value });
  }

  return (
    <Container className={styles.auth}>
      <Form className={styles.authForm}>
        {errorMessage !== "" && (
          <p className={styles.errorMessage}>{errorMessage}</p>
        )}
        {successMessage !== "" && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}
        {formType === "signup" && (
          <>
            {" "}
            <Container className={styles.labelInput}>
              <Label labelText="First Name:" />
              <Input
                inputType="text"
                inputName="firstName"
                inputPlaceholder="Enter first name"
                inputValue={firstName}
                onChangeFunction={handleFirstNameChange}
              />
            </Container>
            <Container className={styles.labelInput}>
              <Label labelText="Last Name:" />
              <Input
                inputType="text"
                inputName="lastName"
                inputPlaceholder="Enter last name"
                inputValue={lastName}
                onChangeFunction={handleLastNameChange}
              />
            </Container>
          </>
        )}

        <Container className={styles.labelInput}>
          <Label labelText="Email:" />
          <Input
            inputType="email"
            inputName="email"
            inputPlaceholder="Enter email address"
            inputValue={email}
            onChangeFunction={handleEmailChange}
          />
        </Container>
        <Container className={styles.labelInput}>
          <Label labelText="Password:" />
          <Input
            inputType="password"
            inputName="password"
            inputPlaceholder="Enter your password"
            inputValue={password}
            onChangeFunction={handlePasswordChange}
          />
        </Container>
        {formType === "signup" && (
          <>
            <Container className={styles.labelInput}>
              <Label labelText="Confirm Password:" />
              <Input
                inputType="password"
                inputName="cPassword"
                inputPlaceholder="Confirm your password"
                inputValue={cPassword}
                onChangeFunction={handleCPasswordChange}
              />
            </Container>
          </>
        )}

        <p onClick={handleFormChange} className={styles.switchForm}>
          {formType === "signup" ? "Already a member?" : "Want to register?"}
        </p>
        <Button
          buttonText={`${formType === "signup" ? "Sign Up" : "Login"}`}
          buttonType="submit"
        />
      </Form>
    </Container>
  );
}
