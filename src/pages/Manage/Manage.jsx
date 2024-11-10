import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Habit from "../Home/Habit";
import HabitDetails from "../../components/HabitDetails/HabitDetails";
import styles from "./Manage.module.css";
import Button from "../../components/Button/Button";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function Manage({ BASE_URL, isAuth, onSetAuth }) {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    // this function is used to fetch all the habits from the server
    async function fetchAllHabits() {
      try {
        const response = await axios.get(`${BASE_URL}/admin/allHabits`, {
          headers: {
            Authorization: localStorage.getItem("InvDrive"),
          },
        });

        if (response.data.statusCode === 200) {
          setHabits(response.data.habits);
        }
      } catch (error) {
        console.error(error);
        if (error.response.status === 401) {
          onSetAuth(false);
        }
      }
    }
    fetchAllHabits();
  }, [BASE_URL, onSetAuth]);

  // this function is used to delete a habit
  async function handleHabitDelete(id) {
    try {
      const response = await axios.delete(`${BASE_URL}/admin/habit/${id}`, {
        headers: {
          Authorization: localStorage.getItem("InvDrive"),
        },
      });
      if (response.data.statusCode === 200) {
        const newHabits = habits.filter((h) => h._id !== id);
        setHabits(newHabits);
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        onSetAuth(false);
      }
    }
  }

  if (!isAuth) {
    return <Navigate to="/auth" />;
  }

  return (
    <Container className={styles.manage}>
      <Container className={styles.habitList}>
        {habits.map((habit) => (
          <HabitDetails key={habit._id} selectedHabit={habit}>
            <Container className={styles.action}>
              <Button
                buttonText={"🗑️ Delete"}
                onClickFunction={() => handleHabitDelete(habit._id)}
              />
            </Container>
          </HabitDetails>
        ))}
      </Container>
    </Container>
  );
}
