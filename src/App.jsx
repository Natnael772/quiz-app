import { useEffect, useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DateCounter from "./DateCounter";
import Header from "./Header";
import MainSection from "./MainSection";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],

  // loading, error,ready, active, finished,
  status: "loading",
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="app">
      <Header />
      <MainSection>
        <p>1/15</p>
        <p>Question?</p>
      </MainSection>
    </div>
  );
}

export default App;
