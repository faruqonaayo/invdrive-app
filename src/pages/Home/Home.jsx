import { useState } from "react";
import Button from "../../components/Button/Button";
import HabitForm from "../../components/HabitForm/HabitForm";
import styles from "./Home.module.css";
import Container from "../../components/Container/Container";
import Label from "../../components/Label/Label";
export default function Home() {
  const [viewForm, setViewForm] = useState(false);

  function handleViewForm() {
    setViewForm(!viewForm);
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
    </div>
  );
}
