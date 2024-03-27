import "bootstrap/dist/css/bootstrap.min.css";
import { createContext } from "react";
import { HomePage } from "./pages/HomePage";
import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";
import Protected from "./Routes/Protected";

export const personitemListContext = createContext({
  personItemList: [],
  setPersonItemList: () => { },
});

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/login"
          element={
            <Protected> </Protected>
          }
        />
        <Route
          path="/home"
          element={
            <Protected>
              <HomePage />
            </Protected>
          }
        />
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
