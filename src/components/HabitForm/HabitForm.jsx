import { useReducer, useState } from "react";
import axios from "axios";
import Container from "../Container/Container";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Option from "../Option/Option";
import Label from "../Label/Label";
import Button from "../Button/Button";
import styles from "./HabitForm.module.css";
import Day from "../Day/Day";

const initialState = {
  habit: "",
  days: [],
  startTime: "",
  endTime: "",
  note: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "habit":
      return { ...state, habit: action.payload };
    case "frequency":
      return { ...state, frequency: action.payload };
    case "startTime":
      return { ...state, startTime: action.payload };
    case "endTime":
      return { ...state, endTime: action.payload };

    case "day": {
      const day = action.payload;
      const isDaySelected = state.days.includes(day);
      let newDays;
      if (isDaySelected) {
        newDays = state.days.filter((d) => d !== day);
      } else {
        newDays = [...state.days, day];
      }
      return { ...state, days: newDays };
    }
    case "note":
      return { ...state, note: action.payload };
    default:
      return state;
  }
}
export default function HabitForm({ BASE_URL }) {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { habit, days, startTime, endTime, note } = formState;
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleHabitChange(e) {
    dispatch({ type: "habit", payload: e.target.value });
  }
  function handleStartTimeChange(e) {
    dispatch({ type: "startTime", payload: e.target.value });
  }
  function handleEndTimeChange(e) {
    dispatch({ type: "endTime", payload: e.target.value });
  }
  function handleNoteChange(e) {
    dispatch({ type: "note", payload: e.target.value });
  }

  async function handleHabitSubmit(e) {
    try {
      e.preventDefault();
      const dataToSubmit = {
        habit,
        days,
        startTime,
        endTime,
        note,
      };

      const res = await axios.put(`${BASE_URL}/admin/habit`, dataToSubmit, {
        headers: { Authorization: localStorage.getItem("InvDrive") },
      });
      if (res.data.statusCode === 201) {
        setErrorMessage("");
        setSuccessMessage(res.data.message);

        // Reset form
        dispatch({ type: "habit", payload: "" });
        dispatch({ type: "days", payload: [] });
        dispatch({ type: "startTime", payload: "" });
        dispatch({ type: "endTime", payload: "" });
        dispatch({ type: "note", payload: "" });
      }
    } catch (error) {
      console.log(error);
      setSuccessMessage("");
      setErrorMessage(error.response.data.message);
    }
  }

  return (
    <Form className={styles.habitForm} onSubmitFunc={handleHabitSubmit}>
      {errorMessage !== "" && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
      {successMessage !== "" && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
      <Container className={styles.labelInput}>
        <Label labelText="Habit:" />
        <Input
          inputType="text"
          inputName="habit"
          inputPlaceholder="Enter habit"
          inputValue={habit}
          onChangeFunction={handleHabitChange}
        />
      </Container>

      <Container className={styles.labelInput}>
        <Label labelText="Days:" />
        <ul className={styles.daysList}>
          <Day dayName="Mon" dayInt={1} dispatch={dispatch} />
          <Day dayName="Tue" dayInt={2} dispatch={dispatch} />
          <Day dayName="Wed" dayInt={3} dispatch={dispatch} />
          <Day dayName="Thu" dayInt={4} dispatch={dispatch} />
          <Day dayName="Fri" dayInt={5} dispatch={dispatch} />
          <Day dayName="Sat" dayInt={6} dispatch={dispatch} />
          <Day dayName="Sun" dayInt={7} dispatch={dispatch} />
        </ul>
      </Container>
      <Container className={styles.labelInput}>
        <Label labelText="Start Time:" />
        <Input
          inputType="time"
          inputName="startTime"
          inputValue={startTime}
          onChangeFunction={handleStartTimeChange}
        />
      </Container>
      <Container className={styles.labelInput}>
        <Label labelText="End Time:" />
        <Input
          inputType="time"
          inputName="endTime"
          inputValue={endTime}
          onChangeFunction={handleEndTimeChange}
        />
      </Container>
      <Container className={styles.labelInput}>
        <Label labelText="Note:" />
        <textarea
          name="note"
          placeholder="Write a note"
          value={note}
          onChange={handleNoteChange}
        ></textarea>
      </Container>
      <Button buttonText="Add Habit" buttonType="submit" />
    </Form>
  );
}
