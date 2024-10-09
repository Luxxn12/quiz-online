import { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(300);
  const navigate = useNavigate();

  useEffect(() => {
    const savedQuiz = JSON.parse(localStorage.getItem("quiz"));
    if (savedQuiz) {
      setQuestions(savedQuiz.questions);
      setCurrentQ(savedQuiz.currentQ);
      setAnswers(savedQuiz.answers);
      setTimer(savedQuiz.timer);
    } else {
      axios
        .get("https://opentdb.com/api.php?amount=10")
        .then((response) => {
          setQuestions(response.data.results);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "quiz",
      JSON.stringify({ questions, currentQ, answers, timer })
    );
  }, [questions, currentQ, answers, timer]);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQ]: answer });
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    navigate("/result", { state: { answers, questions } });
    localStorage.removeItem("quiz");
  };

  if (questions.length === 0)
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="visually-hidden">LOADING...</h1>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <div>
          Soal {currentQ + 1} dari {questions.length}
        </div>
        <div>
          Waktu tersisa: {Math.floor(timer / 60)}:
          {("0" + (timer % 60)).slice(-2)}
        </div>
      </div>
      <Question data={questions[currentQ]} handleAnswer={handleAnswer} />
    </div>
  );
};

export default Quiz;
