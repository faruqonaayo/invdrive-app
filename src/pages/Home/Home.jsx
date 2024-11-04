import HabitForm from "../../components/HabitForm/HabitForm";
import styles from "./Home.module.css";
export default function Home() {
  return (
    <div className={styles.home}>
      <HabitForm />
    </div>
  );
}
