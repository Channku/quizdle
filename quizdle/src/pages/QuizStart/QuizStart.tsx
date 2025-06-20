import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PocketBase from "pocketbase";
import "./QuizStart.css";

interface Quiz {
  emoji: string;
  description: string;
  id: string;
  category: string;
  difficulty?: string;
  duration?: string;
}

const pb = new PocketBase("http://127.0.0.1:8090");

export default function QuizStart() {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const q = await pb.collection("quizzes").getOne<Quiz>(id);
        setQuiz(q);

        const questions = await pb.collection("questions").getFullList({
          filter: `quiz = "${id}"`,
        });

        setQuestionCount(questions.length);
      } catch (err) {
        console.error("Fehler beim Laden des Quiz:", err);
      }
    }

    fetchData();
  }, [id]);

  if (!id) {
    return <p>Ungültige Quiz-ID.</p>;
  }

  if (!quiz) {
    return <p>Quiz wird geladen...</p>;
  }

  return (
    <div className="quiz-card">
      <h2>{quiz.emoji} Kategorie: {quiz.category}</h2>
      <p><strong>Beschreibung: </strong>{quiz.description}</p>

      <p><strong>Fragen:</strong> {questionCount}</p>
      <p><strong>Schwierigkeit:</strong> {quiz.difficulty || "Unbekannt"}</p>
      <p><strong>Dauer:</strong> {quiz.duration || "ca. 5 Minuten"}</p>

      <button
          className="start-button"
          onClick={() => navigate(`/quiz/${id}/question/0`)}
              >
          Quiz starten
      </button>
    </div>
  );
}
