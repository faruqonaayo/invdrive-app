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

export default function Home({ BASE_URL, isAuth, onSetAuth }) {
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
        const response = await axios.get(`${BASE_URL}/auth/checkAuth`, {
          headers: {
            Authorization: localStorage.getItem("InvDrive"),
          },
        });

        if (response.data.statusCode === 200) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          onSetAuth(false);
        }
      }
    }

    // this function is used to fetch the habits from the server
    async function fetchTodayHabits() {
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/todayHabits?day=1`,
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
          onSetAuth(false);
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

  if (!isAuth) {
    return <Navigate to="/auth" />;
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

      {viewForm && <HabitForm BASE_URL={BASE_URL} />}

      {!viewForm && !selectedHabit && (
        <ul className={styles.habitList}>
          {todayHabits.map((h) => (
            <Habit
              key={h._id}
              habitData={h}
              onSelectHabit={setSelectedHabit}
              BASE_URL={BASE_URL}
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
