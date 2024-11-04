import Container from "../Container/Container";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Option from "../Option/Option";
import Label from "../Label/Label";
import Button from "../Button/Button";
import styles from "./HabitForm.module.css";
import { useReducer } from "react";
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
export default function HabitForm() {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { habit, days, startTime, endTime, note } = formState;

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

  return (
    <Container>
      <Form className={styles.habitForm}>
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
            <Day dayName="Mon" dispatch={dispatch} />
            <Day dayName="Tue" dispatch={dispatch} />
            <Day dayName="Wed" dispatch={dispatch} />
            <Day dayName="Thu" dispatch={dispatch} />
            <Day dayName="Fri" dispatch={dispatch} />
            <Day dayName="Sat" dispatch={dispatch} />
            <Day dayName="Sun" dispatch={dispatch} />
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
    </Container>
  );
}
