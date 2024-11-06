import { useState } from "react";
import Container from "../../components/Container/Container";
import Habit from "../Home/Habit";
import HabitDetails from "../../components/HabitDetails/HabitDetails";
import styles from "./Manage.module.css";
import Button from "../../components/Button/Button";

const data = [
  {
    id: 1,
    habit: "Sleep",
    completion: 6,
    startTime: "12:00",
    endTime: "2:00",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    note: "I wanna be consistent",
    done: true,
    dateAdded: new Date().toISOString().split("T")[0],
  },
  {
    id: 2,
    habit: "Eat",
    completion: 6,
    startTime: "18:00",
    endTime: "2:00",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    note: "I wanna be good",
    done: false,
    dateAdded: new Date().toISOString().split("T")[0],
  },
  {
    id: 3,
    habit: "Exercise",
    completion: 6,
    startTime: "18:00",
    endTime: "2:00",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    note: "I wanna be good",
    done: false,
    dateAdded: new Date().toISOString().split("T")[0],
  },
];

export default function Manage() {
  const [habits, setHabits] = useState(data);

  function handleHabitDelete(id) {
    const newHabits = habits.filter((h) => h.id !== id);
    setHabits(newHabits);
  }
  return (
    <Container className={styles.manage}>
      <Container className={styles.habitList}>
        {habits.map((habit) => (
          <HabitDetails key={habit.id} selectedHabit={habit}>
            <Container className={styles.action}>
              <Button
                buttonText={"🗑️ Delete"}
                onClickFunction={() => handleHabitDelete(habit.id)}
              />
            </Container>
          </HabitDetails>
        ))}
      </Container>
    </Container>
  );
}
