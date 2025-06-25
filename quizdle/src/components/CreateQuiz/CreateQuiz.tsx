import React, { useState } from "react";
import PocketBase from "pocketbase";
import "./CreateQuiz.css";
import { useNavigate } from "react-router-dom";

const pb = new PocketBase("http://127.0.0.1:8090");

interface CreateQuizProps {}

const CreateQuiz: React.FC<CreateQuizProps> = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState<number>(50);
  const [color, setColor] = useState("#2196f3");

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        name,
        emoji,
        description,
        category,
        difficulty,
        duration,
        color,
      };

      const createdQuiz = await pb.collection("quizzes").create(data);

      alert("Quiz erfolgreich erstellt!");
      setName("");
      setEmoji("");
      setDescription("");
      setCategory("");
      setDifficulty("");
      setDuration(50);
      setColor("#2196f3");

      navigate(`/quiz/questionmanager/${createdQuiz.id}`);
    } catch (error) {
      console.error("Fehler beim Erstellen des Quiz:", error);
      alert("Fehler beim Erstellen des Quiz.");
    }
  };

  return (
    <div className="create-quiz-container">
      <form onSubmit={handleCreateQuiz} className="form-card">
        <button
          type="button"
          className="close-button"
          onClick={() => navigate("/")}
          aria-label="Schließen"
        >
          ×
        </button>

        <div className="form-grid">
          <div className="form-field">
            <h4>Quiz Name</h4>
            <label>
              <input
                type="text"
                placeholder="Z. B. Musik-Expertenquiz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-field">
            <h4>Emoji</h4>
            <label>
              <input
                type="text"
                placeholder="Z. B. 🎶"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-field">
            <h4>Beschreibung</h4>
            <label>
              <textarea
                placeholder="Worum geht es in deinem Quiz?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-field">
            <h4>Kategorie</h4>
            <label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>
                  Kategorie auswählen
                </option>
                <option value="Musik">Musik</option>
                <option value="Geschichte">Geschichte</option>
                <option value="Technologie">Technologie</option>
              </select>
            </label>
          </div>

          <div className="form-field">
            <h4>Dauer</h4>
            <label>
              <input
                type="range"
                min={1}
                max={60}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                required
              />
              <span>{duration} min</span>
            </label>
          </div>

          <div className="form-field">
            <h4>Schwierigkeit</h4>
            <label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
              >
                <option value="" disabled>
                  Schwierigkeit auswählen
                </option>
                <option value="Easy">Leicht</option>
                <option value="Medium">Mittel</option>
                <option value="Hard">Schwierig</option>
              </select>
            </label>
          </div>
        </div>

        <h4>Background Color</h4>
        <label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
            style={{ height: "3rem" }}
          />
        </label>

        <button type="submit" className="submit-btn">
          Quiz erstellen
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
