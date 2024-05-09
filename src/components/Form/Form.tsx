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

  useEffect(() => {
    const userInStorageString = window.localStorage.getItem("user") as string;
    const userInStorage = JSON.parse(userInStorageString);
    setUser(userInStorage);
  }, []);

  const handleOnEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleOnPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleOnClick = () => {
    // logIn({ email, password });
    fetchHomework();
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

  const fetchHomework = async () => {
    try {
      const response = await fetch(`${API_URL}api/v1/homeworks`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user && (
        <section className="dataContainer">
          {
            <>
              <p>Email: {user.user.email}</p>
              <p>Nombre: {user.user.name}</p>
              <p>ID: {user.user.id}</p>
            </>
          }
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
