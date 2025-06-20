import React, { useState } from "react";
import "./QuestionManager.css";
import { Link } from "react-router-dom";

const initialQuestions = [
  "Wer komponierte die 5. Sinfonie?",
  "Wer ist der Sänger des Songs „Shape of You“?",
  "Wer ist der King of Rock?",
  "Wer komponierte die vier Jahreszeiten?",
  "Wer hat die meisten Platten verkauft?",
];

const QuestionManager: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>(initialQuestions);

  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleDeleteClick = (index: number) => {
    setDeleteIndex(index);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updated = [...questions];
      updated.splice(deleteIndex, 1);
      setQuestions(updated);
      setDeleteIndex(null);
      setShowModal(false);
    }
  };

  const cancelDelete = () => {
    setDeleteIndex(null);
    setShowModal(false);
  };

  const handleChange = (index: number, value: string) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  return (
    <div className="container">
      <div className="form">
        <h2 className="title">Frage entfernen</h2>
        <h3 className="fragetext">Fragetext</h3>
        {questions.map((q, idx) => (
          <div className="question-row" key={idx}>
            <input
              type="text"
              value={q}
              className="question-input"
              onChange={(e) => handleChange(idx, e.target.value)}
            />
            <button
              className="delete-button"
              onClick={() => handleDeleteClick(idx)}
            >
              Frage löschen
            </button>
          </div>
        ))}
        <div className="button-row">
          <Link to={"/"}>
            <button className="save-button">Hauptmenü</button>
          </Link>
          <Link to={"/quiz/addquestion"}>
            <button className="add-button">Fragen erstellen</button>
          </Link>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Möchtest du diese Frage wirklich löschen? (Diese Aktion ist irreversibel!)</p>
            <div className="modal-buttons">
              <button className="modal-cancel" onClick={cancelDelete}>
                Abbrechen
              </button>
              <button className="modal-confirm" onClick={confirmDelete}>
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionManager;
