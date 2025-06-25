import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import QuizQuestion from "./pages/QuizQuestion/QuizQuestion";
import ResultPage from "./pages/ResultPage/ResultPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import CreateQuizPage from "./pages/CreateQuizPage/CreateQuizPage";
import QuizStart from "./pages/QuizStart/QuizStart";
import QuestionManager from "./pages/QuestionManager/QuestionManager";
import AddQuestion from "./pages/AddQuestion/AddQuestion";
import UpdateQuestion from "./pages/UpdateQuestion/UpdateQuestion";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz/:id" element={<QuizStart />} />
          <Route path="/quiz/:id/question/:index" element={<QuizQuestion />} />
          <Route path="/result/:quizId" element={<ResultPage />} />
          <Route path="/create-quiz" element={<CreateQuizPage />} />
          <Route path="/quiz/questionmanager/:quizId" element={<QuestionManager />} />
          <Route path="/quiz/:quizId/addquestion" element={<AddQuestion />} />
          <Route path="/quiz/:quizId/updatequestion/:questionId" element={<UpdateQuestion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
