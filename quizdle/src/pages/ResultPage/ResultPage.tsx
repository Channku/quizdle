import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./ResultPage.css";

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizId } = useParams();

  const { score, total } = location.state || { score: 0, total: 0 };
  const percent = total > 0 ? ((score / total) * 100).toFixed(1) : "0";

  const handleRestart = () => {
    navigate(`/quiz/${quizId}`);
  };

  const handleFinish = () => {
    navigate("/");
  };

  return (
    <div className="result-card">
      <h2>🎉 Quiz beendet!</h2>
      <p>
        Du hast <strong>{score}</strong> von <strong>{total}</strong> Punkten erreicht.<br />
        Das entspricht <strong>{percent}%</strong>.
      </p>

      <div className="button-group">
        <button className="restart" onClick={handleRestart}>Quiz neu starten</button>
        <button className="finish" onClick={handleFinish}>Quiz beenden</button>
      </div>
    </div>
  );
}

