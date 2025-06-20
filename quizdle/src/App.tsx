import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import QuizStart from "./pages/QuizStart";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz/:id" element={<QuizStart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
