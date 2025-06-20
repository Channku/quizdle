import React, { useState } from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090"); // ggf. URL anpassen

interface CreateQuizProps {}

const CreateQuiz: React.FC<CreateQuizProps> = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        title,
        description,
        category,
      };

      await pb.collection("quizzes").create(data);
      alert("Quiz erfolgreich erstellt!");
      setTitle("");
      setDescription("");
      setCategory("");
    } catch (error) {
      console.error("Fehler beim Erstellen des Quiz:", error);
      alert("Fehler beim Erstellen des Quiz.");
    }
  };

  return (
    <div className="create-quiz-container">
      <form onSubmit={handleCreateQuiz} className="form-card">
        <label>
          <strong>Quiz-Titel</strong>
          <input
            type="text"
            placeholder="Z. B. Musik-Expertenquiz"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          <strong>Beschreibung</strong>
          <textarea
            placeholder="Worum geht es in deinem Quiz?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          <strong>Kategorie</strong>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Bitte wählen...</option>
            <option value="Musik">Musik</option>
            <option value="Geschichte">Geschichte</option>
            <option value="Technologie">Technologie</option>
            {/* weitere Kategorien */}
          </select>
        </label>

        <button type="submit" className="submit-btn">
          Quiz erstellen
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
