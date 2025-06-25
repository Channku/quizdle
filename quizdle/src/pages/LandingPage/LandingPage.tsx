import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import "./LandingPage.css";

interface Quiz {
  id: string;
  category: string;
  emoji?: string;
  color: string;
}

const pb = new PocketBase("http://127.0.0.1:8090");

function LandingPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/create-quiz");
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const handleQuizSelect = (id: string) => {
    navigate(`/quiz/questionmanager/${id}`);
    setShowEditModal(false);
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

  return (
    <>
      <div className="header">
        <img src="/logo.png" alt="Quizdle Logo" className="logo" />
        <h1>Quizdle</h1>
      </div>

      <input className="search" type="text" placeholder="Suche nach Quiz..." />

      <h2 className="section-title">EMPFOHLENE QUIZ-KATEGORIEN</h2>

      <div className="category-grid">
        {quizzes.map((quiz) => (
          <CategoryCard
            key={quiz.id}
            id={quiz.id}
            name={quiz.category}
            emoji={quiz.emoji || "❓"}
            color={quiz.color}
          />
        ))}
      </div>

      <div className="button-row">
        <button className="create-button" onClick={handleCreateClick}>
          Quiz erstellen
        </button>
        <button className="edit-button" onClick={handleEditClick}>
          Quiz bearbeiten
        </button>
      </div>

      {/* Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Wähle ein Quiz zum Bearbeiten</h3>
            <ul className="quiz-list">
              {quizzes.map((quiz) => (
                <li
                  key={quiz.id}
                  className="quiz-item"
                  onClick={() => handleQuizSelect(quiz.id)}
                >
                  {quiz.emoji || "❓"} {quiz.category}
                </li>
              ))}
            </ul>
            <button className="close-button" onClick={handleCloseModal}>
              Schließen
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPage;
