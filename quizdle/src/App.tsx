import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import QuizStart from "./pages/QuizStart";
import CreateQuizPage from "./pages/CreateQuizPage/CreateQuizPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz/:id" element={<QuizStart />} />
          <Route path="/create-quiz" element={<CreateQuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
