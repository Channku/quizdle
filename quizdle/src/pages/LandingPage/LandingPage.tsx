import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import "./LandingPage.css";
import SearchFilter from "../../components/SearchFilter/SearchFilter";

interface Quiz {
  id: string;
  name: string;
  emoji?: string;
  color: string;
}

const pb = new PocketBase("http://127.0.0.1:8090");

function LandingPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filterText, setFilterText] = useState("");
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

  const handleDeleteQuiz = async (id: string) => {
    const confirmDelete = window.confirm(
      "Willst du dieses Quiz wirklich löschen?"
    );
    if (!confirmDelete) return;

    try {
      await pb.collection("quizzes").delete(id);
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
      alert("Fehler beim Löschen.");
    }
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
        quiz.name.toLowerCase().startsWith(filterText.toLowerCase())
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
            name={quiz.name}
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
        <button className="edit-button" onClick={handleEditClick}>
          Quiz bearbeiten
        </button>
      </div>

      {/* Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Schließen Button oben rechts */}
            <button className="modal-close-button" onClick={handleCloseModal}>
              ✖
            </button>

            <h3>Wähle ein Quiz zum Bearbeiten</h3>
            <ul className="quiz-list">
              {quizzes.map((quiz) => (
                <li key={quiz.id} className="quiz-item">
                  <div
                    className="quiz-info"
                    onClick={() => handleQuizSelect(quiz.id)}
                  >
                    {quiz.emoji || "❓"} {quiz.name}
                  </div>
                  <button
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteQuiz(quiz.id);
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPage;
