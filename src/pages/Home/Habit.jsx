import Container from "../../components/Container/Container";
import Label from "../../components/Label/Label";
import Button from "../../components/Button/Button";
import styles from "./Habit.module.css";

const doneStyle = {
  textDecoration: "line-through",
  color: "gray",
};

export default function Habit({ habitData, onSelectHabit, habits, setHabits }) {
  function handleSelectedHabit() {
    onSelectHabit(habitData);
  }

  function handleHabitDone() {
    const modifiedHabits = habits.map((h) => {
      if (h.id === habitData.id) {
        h.done = !h.done;
      }
      return h;
    });
    setHabits(modifiedHabits);
  }

  return (
    <li className={styles.habit}>
      <Container className={styles.habitHeader}>
        <Label
          labelText={`${habitData.habit}`}
          style={habitData.done ? doneStyle : null}
        />
        <span>
          <Label labelText={`${habitData.startTime} - ${habitData.endTime}`} />
        </span>
      </Container>
      <Container className={styles.action}>
        <Button
          buttonText={habitData.done ? "Not Done" : "Done"}
          onClickFunction={handleHabitDone}
        />
        <Button buttonText="View" onClickFunction={handleSelectedHabit} />
      </Container>
    </li>
  );
}
