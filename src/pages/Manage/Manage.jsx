import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Habit from "../Home/Habit";
import HabitDetails from "../../components/HabitDetails/HabitDetails";
import styles from "./Manage.module.css";
import Button from "../../components/Button/Button";
import axios from "axios";

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
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    // this function is used to fetch all the habits from the server
    async function fetchAllHabits() {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/allHabits",
          {
            headers: {
              Authorization: localStorage.getItem("InvDrive"),
            },
          }
        );

        if (response.data.statusCode === 200) {
          setHabits(response.data.habits);
        }
      } catch (error) {
        console.error(error);
        if (error.response.status === 401) {
          window.location.href = "/auth";
        }
      }
    }
    fetchAllHabits();
  }, []);

  // this function is used to delete a habit
  async function handleHabitDelete(id) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/admin/habit/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("InvDrive"),
          },
        }
      );
      if (response.data.statusCode === 200) {
        const newHabits = habits.filter((h) => h._id !== id);
        setHabits(newHabits);
      }
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        window.location.href = "/auth";
      }
    }
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
