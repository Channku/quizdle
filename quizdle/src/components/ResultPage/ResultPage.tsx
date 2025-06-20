import { useNavigate, useLocation } from "react-router-dom";
import "./ResultPage.css";

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total } = location.state || { score: 0, total: 0 };

  const handleFinish = () => {
    navigate("/");
  };

  return (
    <div className="result-card">
      <h2>🎉 Quiz beendet!</h2>
      <p>Du hast <strong>{score}</strong> von <strong>{total}</strong> Punkten erreicht.</p>

      <button onClick={handleFinish}>Quiz beenden</button>
    </div>
  );
}
