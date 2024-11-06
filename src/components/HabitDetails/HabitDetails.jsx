import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Label from "../../components/Label/Label";
import styles from "./HabitDetails.module.css";

export default function HabitDetails({
  selectedHabit,
  children,
}) {

  return (
    <Container className={styles.habitDetails}>
      <Container className={styles.habitInfos}>
        <Container className={styles.info}>
          <Label labelText="Habit: " />
          <p>{selectedHabit.habit}</p>
        </Container>
        <Container className={styles.info}>
          <Label labelText="Days: " />
          <p>{selectedHabit.days.toString()}</p>
        </Container>
        <Container className={styles.info}>
          <Label labelText="Date Added: " />
          <p>{selectedHabit.dateAdded}</p>
        </Container>
        <Container className={styles.info}>
          <Label labelText="Number of Completions: " />
          <p>{selectedHabit.completion}</p>
        </Container>
        <Container className={styles.info}>
          <Label labelText="Start Time: " />
          <p>{selectedHabit.startTime}</p>
        </Container>
        <Container className={styles.info}>
          <Label labelText="End Time: " />
          <p>{selectedHabit.endTime}</p>
        </Container>

        <Container className={styles.info}>
          <Label labelText="Note: " />
          <p>{selectedHabit.note}</p>
        </Container>
      </Container>
      <Container className={styles.action}>{children}</Container>
    </Container>
  );
}
