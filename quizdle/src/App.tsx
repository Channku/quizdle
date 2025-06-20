import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import QuizStart from "./pages/QuizStart/QuizStart";
import QuizQuestion from "./components/QuizQuestion/QuizQuestion";
import ResultPage from "./components/ResultPage/ResultPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz/:id" element={<QuizStart />} />
          <Route path="/quiz/:id/question/:index" element={<QuizQuestion />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
