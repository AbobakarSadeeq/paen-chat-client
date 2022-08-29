import logo from "./logo.svg";
import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Layout from "../src/components/layout/layout";
import Auth from "./components/Auth/auth";

function App() {
  let userLoggedIn = localStorage.getItem("token") ? (
    <Layout />
  ) : (
    <>
      <Auth />
    </>
  );
  return <>{userLoggedIn}</>;
}

export default App;
