import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CountButton from "./components/CountButton";
import Header from "./components/Header";
import Form from "./components/Form/Form";

function App() {
  return (
    <main>
      <Header title="INGRESO" />
      <Form />
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </main>
  );
}

export default App;
