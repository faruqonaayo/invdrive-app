import { useState } from "react";
import Button from "../../components/Button/Button";
import HabitForm from "../../components/HabitForm/HabitForm";
import styles from "./Home.module.css";
export default function Home() {
  const [viewForm, setViewForm] = useState(false);

  function handleViewForm() {
    setViewForm(!viewForm);
  }
  return (
    <div className={styles.home}>
      <Button
        buttonText="View Form"
        className={styles.addBtn}
        onClickFunction={handleViewForm}
      />
      {viewForm && <HabitForm />}
    </div>
  );
}
