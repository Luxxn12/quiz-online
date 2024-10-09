import { useState, useEffect } from 'react';

const decodeHtml = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const Question = ({ data, handleAnswer }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let allOptions = [...data.incorrect_answers];
    const randomIndex = Math.floor(Math.random() * (allOptions.length + 1));
    allOptions.splice(randomIndex, 0, data.correct_answer);
    setOptions(allOptions);
  }, [data]);

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md">
      <h3 className="mb-4 text-lg font-semibold">{decodeHtml(data.question)}</h3>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className={`px-4 py-2 text-left w-full mb-3 rounded border 'bg-white text-gray-800 border-gray-300 hover:bg-gray-400
            `}
          >
            {decodeHtml(option)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
