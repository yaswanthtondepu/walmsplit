import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, createContext } from "react";
import { HomePage } from "./pages/HomePage";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ToggleBox from "./components/ToggleBox";
import TotalBox from "./components/TotalBox";
import { ItemBox } from "./components/ItemBox";
import { WelcomePage } from "./pages/WelcomePage";
import Protected from "./Routes/Protected";

export const personitemListContext = createContext({
  personItemList: [],
  setPersonItemList: () => {},
});

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
