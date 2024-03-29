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
import Question from "./Question";

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start": {
      return {
        ...state,
        status: "active",
      };
    }

    default:
      throw new Error("Unknown action");
  }
}
const initialState = {
  questions: [],

  // loading, error,ready, active, finished,
  status: "loading",
};

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  // const [state, dispatch] = useReducer(reducer, initialState);

  //derived state
  const numQuestions = questions.length;

  // //fetch question data
  useEffect(function () {
    async function fetchQuestion() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        console.error(error);
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestion();
  }, []);
  return (
    <div className="app">
      <Header />
      <MainSection>
        {/* <p>1/15</p>
        <p>Question?</p> */}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={() => dispatch({ type: "start" })}
          />
        )}
      </MainSection>
    </div>
  );
}

export default App;
