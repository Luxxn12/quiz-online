import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, questions } = location.state;

  if (!answers || !questions) {
    return <div>No result to show.</div>;
  }

  let correct = 0;
  let wrong = 0;

  questions.forEach((q, index) => {
    if (answers[index] === q.correct_answer) {
      correct += 1;
    } else {
      wrong += 1;
    }
  });

  const handleRestart = () => {
    navigate("/quiz");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white w-96 rounded shadow-md text-center">
        <h2 className="mb-4 text-2xl font-bold">Hasil Kuis</h2>
        <p className="mb-2">Total Jawaban: {questions.length}</p>
        <p className="mb-2 text-green-600">Benar: {correct}</p>
        <p className="mb-4 text-red-600">Salah: {wrong}</p>
        <button
          onClick={handleRestart}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Mulai Lagi
        </button>
      </div>
    </div>
  );
};

export default Result;
