import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { Link, useNavigate } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import "./LandingPage.css";
import SearchFilter from "../../components/SearchFilter/SearchFilter";

interface Quiz {
  id: string;
  category: string;
  emoji?: string;
  color: string;
}

const pb = new PocketBase("http://127.0.0.1:8090");

function LandingPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/create-quiz");
  };

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const records = await pb.collection("quizzes").getFullList<Quiz>();
        setQuizzes(records);
      } catch (err) {
        console.error("Fehler beim Laden der Daten:", err);
      }
    }

    fetchQuizzes();
  }, []);

  const filteredQuizzes = filterText
    ? quizzes.filter((quiz) =>
        quiz.category.toLowerCase().startsWith(filterText.toLowerCase())
      )
    : quizzes;

  return (
    <>
      <div className="header">
        <img src="/logo.png" alt="Quizdle Logo" className="logo" />
        <h1>Quizdle</h1>
      </div>

      <SearchFilter filterText={filterText} setFilterText={setFilterText} />

      <h2 className="section-title">EMPFOHLENE QUIZ-KATEGORIEN</h2>

      <div className="category-grid">
        {filteredQuizzes.map((quiz) => (
          <CategoryCard
            key={quiz.id}
            id={quiz.id}
            name={quiz.category}
            emoji={quiz.emoji || "❓"}
            color={quiz.color}
          />
        ))}
      </div>
      {filteredQuizzes.length === 0 && (
        <p className="no-quizzes-message">Keine Quiz-Kategorien gefunden.</p>
      )}
      <div className="button-row">
        <button className="create-button" onClick={handleCreateClick}>
          Quiz erstellen
        </button>
        <Link to={"/quiz/addquestion"}>
          <button className="edit-button">Quiz Bearbeiten</button>
        </Link>
      </div>
    </>
  );
}

export default LandingPage;
