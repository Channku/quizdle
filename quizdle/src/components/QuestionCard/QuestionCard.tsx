import React from "react";
import "./QuestionCard.css";

interface QuestionCardProps {
  id: string;
  question: string;
  options: string[];
  correct: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, correct }) => {
  return (
    <div className="question-card">
      <h3>{question}</h3>
      <ul>
        {options.map((opt, idx) => (
          <li
            key={idx}
            className={opt === correct ? "correct" : ""}
          >
            {opt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionCard;
