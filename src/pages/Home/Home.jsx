import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import HabitForm from "../../components/HabitForm/HabitForm";
import styles from "./Home.module.css";
import Container from "../../components/Container/Container";
import Label from "../../components/Label/Label";
import Habit from "./Habit";
import HabitDetails from "../../components/HabitDetails/HabitDetails";
import Select from "../../components/Select/Select";
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
];

export default function Home() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    habitTokens: 0,
  });
  const [todayHabits, setTodayHabits] = useState([]);
  const [viewForm, setViewForm] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);

  useEffect(() => {
    // this function is used to fetch the user data from the server
    async function fetchUserData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/auth/checkAuth",
          {
            headers: {
              Authorization: localStorage.getItem("InvDrive"),
            },
          }
        );

        if (response.data.statusCode === 200) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          window.location.href = "/auth";
        }
      }
    }

    // this function is used to fetch the habits from the server
    async function fetchTodayHabits() {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/todayHabits",
          {
            headers: {
              Authorization: localStorage.getItem("InvDrive"),
            },
          }
        );

        if (response.data.statusCode === 200) {
          setTodayHabits(response.data.habits);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          window.location.href = "/auth";
        }
      }
    }

    fetchUserData();
    fetchTodayHabits();
  }, []);

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
          <h1>{user.habitTokens} Points</h1>
          <Button
            buttonText={viewForm ? "Close" : "Add Habit"}
            className={styles.viewFormBtn}
            onClickFunction={handleViewForm}
          />
        </Container>
        <Container className={styles.box}>
          <p className={styles.description}>
            {user.firstName} {user.lastName} keep track of your habits and
            achieve your goals
          </p>
          <p>You have {todayHabits.length} tasks to do today</p>
        </Container>
      </Container>

      {viewForm && <HabitForm />}

      {!viewForm && !selectedHabit && (
        <ul className={styles.habitList}>
          {todayHabits.map((h) => (
            <Habit
              key={h._id}
              habitData={h}
              onSelectHabit={setSelectedHabit}
              setHabits={setTodayHabits}
              habits={todayHabits}
            />
          ))}
        </ul>
      )}

      {!viewForm && selectedHabit && (
        <HabitDetails
          selectedHabit={selectedHabit}
          onClose={setSelectedHabit}
          // habits={habits}
          // onSetHabits={setHabits}
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
