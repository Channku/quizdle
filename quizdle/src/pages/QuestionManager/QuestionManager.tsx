import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PocketBase from "pocketbase";
import "./QuestionManager.css";

interface Question {
  id: string;
  question: string;
  quiz: string;
}

const pb = new PocketBase("http://127.0.0.1:8090");

const QuestionManager: React.FC = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const records = await pb
          .collection("questions")
          .getFullList<Question>({
            filter: `quiz="${quizId}"`,
          });
        setQuestions(records);
      } catch (error) {
        console.error("Fehler beim Laden der Fragen:", error);
      }
    }

    fetchQuestions();
  }, [quizId]);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await pb.collection("questions").delete(deleteId);
        setQuestions(questions.filter((q) => q.id !== deleteId));
      } catch (error) {
        console.error("Fehler beim Löschen:", error);
      }
      setDeleteId(null);
      setShowModal(false);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setShowModal(false);
  };

  const handleChange = (id: string, value: string) => {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, question: value } : q
    );
    setQuestions(updated);
  };

  const handleSave = async (id: string, newQuestion: string) => {
    try {
      await pb.collection("questions").update(id, { question: newQuestion });
      console.log("Frage gespeichert");
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2 className="title">Fragen verwalten</h2>
        <h3 className="fragetext">Fragetext</h3>

        {questions.length === 0 && (
          <p>Keine Fragen vorhanden. Bitte füge Fragen hinzu.</p>
        )}

        {questions.map((q) => (
          <div className="question-row" key={q.id}>
            <input
              type="text"
              value={q.question}
              className="question-input"
              onChange={(e) => handleChange(q.id, e.target.value)}
              onBlur={() => handleSave(q.id, q.question)}
            />
            <button
              className="delete-button"
              onClick={() => handleDeleteClick(q.id)}
            >
              Frage löschen
            </button>
          </div>
        ))}

        <div className="button-row">
          <Link to={"/"}>
            <button className="save-button">Hauptmenü</button>
          </Link>
          <Link to={`/quiz/${quizId}/addquestion`}>
            <button className="add-button">Frage hinzufügen</button>
          </Link>
        </div>
      </div>

      {/* Modal für Bestätigung */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>
              Möchtest du diese Frage wirklich löschen? (Diese Aktion ist
              irreversibel!)
            </p>
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
