import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PocketBase from "pocketbase";
import "./QuizQuestion.css";

const pb = new PocketBase("http://127.0.0.1:8090");
interface Question {
  id: string;
  question: string;
  answers: string[];
  correct: string;
}

export default function QuizQuestion() {
  const { id, index } = useParams<{ id: string; index: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const previousScore = (location.state as { score: number })?.score || 0;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const currentIndex = parseInt(index || "0");

  useEffect(() => {
    async function fetchQuestions() {
      const q = await pb.collection("questions").getFullList({
        filter: `quiz = "${id}"`,
      });
      setQuestions(q as unknown as Question[]);
    }

    fetchQuestions();
  }, [id]);

  useEffect(() => {
    setSelected(null);
  }, [index]);

  if (!questions.length) return <p>Lade Fragen...</p>;

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  function handleNext() {
    if (selected === null) return;

    const selectedAnswer = currentQuestion.answers[selected];
    const correctAnswer = currentQuestion.correct;

    const isCorrect =
      selectedAnswer.trim().toLowerCase() ===
      correctAnswer.trim().toLowerCase();

    console.log("Ausgewählt:", selectedAnswer);
    console.log("Korrekt:", correctAnswer);
    console.log("Richtig beantwortet:", isCorrect);

    const newScore = previousScore + (isCorrect ? 1 : 0);

    if (!isLast) {
      navigate(`/quiz/${id}/question/${currentIndex + 1}`, {
        state: { score: newScore },
      });
    } else {
      navigate(`/result/${id}`, {
        state: {
          score: newScore,
          total: questions.length,
        },
      });
    }
  }

  return (
    <div className="quiz-question-card">
      <div className="quiz-meta">
        <span>
          Frage {currentIndex + 1} von {questions.length}
        </span>
      </div>

      <h2 className="question-text">{currentQuestion.question}</h2>

      <div className="answers">
        {currentQuestion.answers.map((answer, i) => (
          <button
            key={i}
            className={`answer ${selected === i ? "selected" : ""}`}
            onClick={() => setSelected(i)}
          >
            {String.fromCharCode(65 + i)}) {answer}
          </button>
        ))}
      </div>

      <button
        className="next-button"
        onClick={handleNext}
        disabled={selected === null}
      >
        {isLast ? "Fertig" : "Weiter"}
      </button>
    </div>
  );
}
