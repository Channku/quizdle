import React, { useState } from "react";
import "./AddQuestion.css";
import { Link } from "react-router-dom";

const AddQuestion: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleAnswerChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleAddAnother = () => {
    setQuestion("");
    setAnswers(["", "", "", ""]);
    setCorrectAnswer("");
  };

  return (
    <div className="add-container">
      <div className="add-form">
        <h2 className="add-title">Frage hinzufügen</h2>

        <label className="label">Fragetext</label>
        <input
          type="text"
          placeholder="Z. B. Wer komponierte die 5. Sinfonie?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="text-input"
        />

        <label className="label">Antwortmöglichkeiten</label>
        {["A", "B", "C", "D"].map((letter, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`${letter}) Antwort eingeben`}
            value={answers[idx]}
            onChange={(e) => handleAnswerChange(idx, e.target.value)}
            className="text-input"
          />
        ))}

        <label className="label">Richtige Antwort</label>
        <select
          className="text-input"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        >
          <option value="">Bitte wählen...</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>

        <div className="button-row">
          <Link to={"/"}>
            <button className="toMain-button">Hauptmenü</button>
          </Link>
          <button className="add-button" onClick={handleAddAnother}>Erstellen</button>
          <Link to={"/quiz/questionmanager"}>
            <button className="toDelete-button">Fragen löschen</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
