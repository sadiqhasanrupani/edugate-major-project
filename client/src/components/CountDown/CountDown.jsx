import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CountDown = ({ duration, submitInCompleteQuiz, quizName }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = `Are you sure you want to reload? If you reload, you will not be able to take the ${quizName} quiz.`;
    };

    const checkCountdown = () => {
      if (timeRemaining === 0) {
        clearInterval(timer);
        window.removeEventListener("beforeunload", handleBeforeUnload);
        alert("Time is up. You cannot give the quiz.");
        submitInCompleteQuiz();
        navigate(-1);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    checkCountdown();

    return () => {
      clearInterval(timer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [timeRemaining, navigate]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return <span>{formatTime(timeRemaining)}</span>;
};

export default CountDown;
