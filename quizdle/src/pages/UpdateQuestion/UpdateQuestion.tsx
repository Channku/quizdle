import React, { useEffect, useState } from "react";
import "./UpdateQuestion.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

const UpdateQuestion: React.FC = () => {
  const { quizId } = useParams();
  const { questionId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleAnswerChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      if (!questionId) return;

      try {
        const record = await pb.collection("questions").getOne(questionId);
        setQuestion(record.question);
        setAnswers((record.answers || []).concat(["", "", "", ""]).slice(0, 4));
      } catch (error) {
        console.error("Fehler beim Laden der Frage:", error);
      }
    };

    fetchQuestion();
  }, [questionId]);

  const handleUpdateQuestion = async () => {
    if (!quizId) {
      alert("Fehler: Keine Quiz-ID gefunden!");
      return;
    }

    if (!questionId) {
      alert("Fehler: Keine Question-ID gefunden!");
      return;
    }

    if (!question || answers.some((a) => !a) || !correctAnswer) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }

    const correctAnswerIndex = ["A", "B", "C", "D"].indexOf(correctAnswer);

    if (correctAnswerIndex === -1) {
      alert("Bitte eine gültige richtige Antwort auswählen.");
      return;
    }

    const correctAnswerText = answers[correctAnswerIndex];

    if (!correctAnswerText) {
      alert("Der Antworttext der richtigen Antwort fehlt.");
      return;
    }

    try {
      await pb.collection("questions").update(questionId, {
        question: question,
        answers: answers,
        correct: correctAnswerText,
      });

      alert("Frage erfolgreich bearbeitet!");
      navigate(`/quiz/questionmanager/${quizId}`);
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      alert("Fehler beim Speichern der Frage.");
    }
  };

  return (
    <div className="add-container">
      <div className="add-form">
        <h2 className="add-title">Frage bearbeiten</h2>

        <label className="label">Fragetext</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="text-input"
        />

        <label className="label">Antwortmöglichkeiten</label>
        {["A", "B", "C", "D"].map((_letter, idx) => (
          <input
            key={idx}
            type="text"
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
          <button className="add-button" onClick={handleUpdateQuestion}>
            Speichern
          </button>
          <Link to={`/quiz/questionmanager/${quizId}`}>
            <button className="toDelete-button">Abbrechen</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuestion;
