import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import HabitForm from "../../components/HabitForm/HabitForm";
import styles from "./Home.module.css";
import Container from "../../components/Container/Container";
import Label from "../../components/Label/Label";
import Habit from "./Habit";
import HabitDetails from "../../components/HabitDetails/HabitDetails";
import Select from "../../components/Select/Select";

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
];

export default function Home() {
  const [habits, setHabits] = useState(data);
  const [viewForm, setViewForm] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);

  function handleViewForm() {
    setViewForm(!viewForm);
  }

  function handleCloseDetail() {
    setSelectedHabit(null);
  }

  return (
    <div className={styles.home}>
      <Container className={styles.homeHeader}>
        <Container className={styles.box}>
          <h1>10000 Points</h1>
          <Button
            buttonText={viewForm ? "Close" : "Add Habit"}
            className={styles.viewFormBtn}
            onClickFunction={handleViewForm}
          />
        </Container>
        <Container className={styles.box}>
          <p className={styles.description}>
            Keep track of your habits and achieve your goals
          </p>
          <p>You have 2 tasks pending today</p>
        </Container>
      </Container>

      {viewForm && <HabitForm />}

      {!viewForm && !selectedHabit && (
        <ul className={styles.habitList}>
          {habits.map((h) => (
            <Habit
              key={h.id}
              habitData={h}
              onSelectHabit={setSelectedHabit}
              setHabits={setHabits}
              habits={habits}
            />
          ))}
        </ul>
      )}

      {!viewForm && selectedHabit && (
        <HabitDetails
          selectedHabit={selectedHabit}
          onClose={setSelectedHabit}
          habits={habits}
          onSetHabits={setHabits}
        >
          <Button buttonText={"❌ Close"} onClickFunction={handleCloseDetail} />
          <Link to="manage">
            <Button buttonText={"📝 Manage"} />
          </Link>
        </HabitDetails>
      )}
    </div>
  );
}
