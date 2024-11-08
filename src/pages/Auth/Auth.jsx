import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Container from "../../components/Container/Container";
import Input from "../../components/Input/Input";
import Label from "../../components/Label/Label";
import Form from "../../components/Form/Form";
import Button from "../../components/Button/Button";
import styles from "./Auth.module.css";
import { Navigate } from "react-router-dom";

const initialState = {
  formType: "login",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
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
    case "confirmPassword":
      return { ...state, confirmPassword: action.payload };
    default:
      return state;
  }
}
export default function Auth({ isAuth, onSetAuth }) {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { formType, firstName, lastName, email, password, confirmPassword } =
    formState;

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function confirmAuth() {
      try {
        const res = await axios.get("http://localhost:3000/auth/checkAuth", {
          headers: { Authorization: localStorage.getItem("InvDrive") },
        });
        if (res.data.statusCode === 200) {
          onSetAuth(true);
        }
      } catch (error) {
        console.log(error);
        onSetAuth(false);
      }
    }

    confirmAuth();
  }, []);

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
    dispatch({ type: "confirmPassword", payload: e.target.value });
  }

  async function handleAuthSubmit(e) {
    try {
      e.preventDefault();
      if (formType === "signup") {
        const dataToSubmit = {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        };
        const response = await axios.put(
          "http://localhost:3000/auth/signup",
          dataToSubmit
        );

        // setting success message
        setErrorMessage("");
        setSuccessMessage(response.data.message);

        // setting form fields to empty except email
        dispatch({ type: "firstName", payload: "" });
        dispatch({ type: "lastName", payload: "" });
        dispatch({ type: "password", payload: "" });
        dispatch({ type: "confirmPassword", payload: "" });
        dispatch({ type: "formChange" });
      } else if (formType === "login") {
        const dataToSubmit = {
          email,
          password,
        };
        const response = await axios.post(
          "http://localhost:3000/auth/login",
          dataToSubmit
        );

        // setting success message
        setErrorMessage("");
        setSuccessMessage(response.data.message);
        localStorage.setItem("InvDrive", `Bearer ${response.data.token}`);

        // setting form fields to empty
        dispatch({ type: "password", payload: "" });
        dispatch({ type: "email", payload: "" });

        setTimeout(() => {
          onSetAuth(true);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setSuccessMessage("");
      setErrorMessage(error.response.data.message);
    }
  }

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Container className={styles.auth}>
      <Form className={styles.authForm} onSubmitFunc={handleAuthSubmit}>
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
                inputValue={confirmPassword}
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
