import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import QuizQuestion from "./pages/QuizQuestion/QuizQuestion";
import ResultPage from "./pages/ResultPage/ResultPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import CreateQuizPage from "./pages/CreateQuizPage/CreateQuizPage";
import QuizStart from "./pages/QuizStart/QuizStart";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz/:id" element={<QuizStart />} />
          <Route path="/quiz/:id/question/:index" element={<QuizQuestion />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/create-quiz" element={<CreateQuizPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
