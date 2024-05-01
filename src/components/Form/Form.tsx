import { useEffect, useState } from "react";
import "./Form.css";
import Data from "./Data";

const loginData = {
  email: "vnavarro@ceti.mx",
  password: "123456",
};

function Form() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showData, setShowData] = useState<boolean>(false);

  //   useEffect(() => {
  //     if (email != loginData.email) {
  //       alert("Easter Egg!!!");
  //     }
  //   }, [email]);

  //   const handleInputChange = (stateUpdate) => {
  //     return (event) => {
  //       stateUpdate(event.target.value);
  //     };
  //   };
  const handleOnEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleOnPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };
  //   const handleOnClick = () => {
  //     if (showData) {
  //       setEmail("");
  //       setPassword("");
  //       setShowData(false);
  //     }
  //     //toggle the flag
  //     else if (email === loginData.email && password === loginData.password) {
  //       {
  //         setShowData(true);
  //       }
  //     }
  //     setShowData(!showData);
  //   };
  const handleOnClick = () => {
    if (showData) {
      setEmail("");
      setPassword("");
      setShowData(false);
    } else if (email === loginData.email && password === loginData.password) {
      setShowData(true);
    } else {
      setEmail("");
      setPassword("");
      setShowData(false);
      alert("Información incorrecta, vuelva a intentarlo...");
    }
  };

  return (
    <>
      <Data email={email} password={password} showData={showData} />
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
