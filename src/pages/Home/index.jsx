import React, { useState, useEffect } from "react";
import "./css/style.css";
import { Card } from "../../components/Card";

export function Home() {
  const [name, setName] = useState("");
  const [student, setStudents] = useState([]);
  const [user, setUser] = useState({ name: "User", avatar: "" });
  function handleStudents() {
    const newStudent = {
      name: name,
      time: new Date().toLocaleTimeString("pt-ao", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents((prevState) => [...prevState, newStudent]);
  }

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("https://api.github.com/users/ivandro-neto");
      const data = await response.json();
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    };
    loadData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="content">
          <header>
            <h1>Presence List</h1>
            <div>
              <strong>{user.name}</strong>
              <img src={user.avatar} alt="Profile picture" />
            </div>
          </header>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite um nome..."
          />
          <button onClick={handleStudents}>Add</button>
        </div>
        {student.map((student) => (
          <Card
            key={student.name + student.time}
            name={student.name}
            time={student.time}
          />
        ))}
      </div>
    </>
  );
}
