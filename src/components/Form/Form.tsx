import { useEffect, useState } from "react";
import "./Form.css";
import Data from "./Data";

const API_URL = "http://localhost:3010/";

// const loginData = {
//   email: "vnavarro@ceti.mx",
//   password: "123456",
// };

function Form() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showData, setShowData] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [homeworks, setHomeworks] = useState<any>(null);

  useEffect(() => {
    const data = async () => {
      try {
        let url = `${API_URL}api/v1/homeworks/findOne`;
        let options = {};

        const response = await fetch(url, options);
        const data = await response.json();
        setHomeworks(data);
      } catch (error) {
        console.log(error);
      }
    };

    data();
  }, [API_URL, user]);

  const handleOnEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleOnPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleOnClick = () => {
    logIn({ email, password });
  };

  const logIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch(`${API_URL}api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
        window.localStorage.setItem("user", JSON.stringify(data));
      } else {
        alert("Usuario o contraseña incorreta...");
      }

      console.log(Data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* {useEffect(() => {
        const userInStorageString = window.localStorage.getItem(
          "user"
        ) as string;
        const userInStorage = JSON.parse(userInStorageString);
        setUser(userInStorage);
      }, [])} */}

      {user && (
        <section className="dataContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Description</th>
                <th>Date Assignment</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{homeworks.name}</td>
                <td>{homeworks.subject}</td>
                <td>{homeworks.description}</td>
                <td>{homeworks.dateAssignment}</td>
                <td>{homeworks.deadline}</td>
                <td>{homeworks.status}</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      <section className="formContainer">
        <span className="inputContainer">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleOnEmailChange}
          />
        </span>
        <span className="inputContainer">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleOnPasswordChange}
          />
        </span>
        <br></br>
        <button onClick={handleOnClick}>
          {showData ? "Limpiar" : "Ingresar"}
        </button>
      </section>
    </>
  );
}

export default Form;
