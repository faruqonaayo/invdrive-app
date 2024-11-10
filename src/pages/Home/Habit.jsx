import Container from "../../components/Container/Container";
import Label from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import styles from "./Habit.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const doneStyle = {
  textDecoration: "line-through",
  color: "gray",
};

export default function Habit({ habitData, onSelectHabit, BASE_URL }) {
  const [habitDone, setHabitDone] = useState(false);
  function handleSelectedHabit() {
    onSelectHabit(habitData);
  }
  useEffect(() => {
    // this function checks if the habit is done
    async function checkHabitDone() {
      habitData.completionDates.forEach((date) => {
        if (date.split("T")[0] === new Date().toISOString().split("T")[0]) {
          setHabitDone(true);
        }
      });
    }
    checkHabitDone();
  }, [habitData]);

  // lift this up later
  async function handleHabitDone() {
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/check/${habitData._id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("InvDrive"),
          },
        }
      );
      if (response.data.statusCode === 200) {
        setHabitDone(!habitDone);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <li className={styles.habit}>
      <Container className={styles.habitHeader}>
        <Label
          labelText={`${habitData.habit}`}
          style={habitDone ? doneStyle : null}
        />
        <span>
          <Label labelText={`${habitData.startTime} - ${habitData.endTime}`} />
        </span>
      </Container>
      <Container className={styles.action}>
        <Button
          buttonText={habitDone ? "Not Done" : "Done"}
          onClickFunction={handleHabitDone}
        />
        <Button buttonText="View" onClickFunction={handleSelectedHabit} />
      </Container>
    </li>
  );
}
