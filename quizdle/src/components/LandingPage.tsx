import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import CategoryCard from ".././components/CategoryCard";

interface Quiz {
  id: string;
  category: string;
  emoji?: string;
  color: string;
}

const pb = new PocketBase("http://127.0.0.1:8090");

function LandingPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

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
            name={quiz.category}
            emoji={quiz.emoji || "❓"}
            color={quiz.color}
            onClick={() => console.log(`Kategorie gewählt: ${quiz.category}`)}
          />
        ))}
      </div>

      <button className="create-button">Quiz erstellen</button>
    </>
  );
}

export default LandingPage;
