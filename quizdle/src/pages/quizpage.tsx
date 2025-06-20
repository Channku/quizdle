import React, { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import QuestionCard from "../components/QuestionCard";

interface Question {
  id: string;
  name: string;
  options: string[];
  correct: string;
}

const pb = new PocketBase("http://127.0.0.1:8090");

function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);

   useEffect(() => {
      async function fetchQuestions() {
        try {
          const records = await pb.collection("questions").getFullList<Question>();
          setQuestions(records);
        } catch (err) {
          console.error("Fehler beim Laden der Daten:", err);
        }
      }
  
      fetchQuestions();
    }, []);
    console.log(questions)

  return (
    <div className="questions-container">
      {questions.map((q) => (
        <QuestionCard
          id={q.id}
          question={q.name}
          options={q.options}
          correct={q.correct}
        />
      ))}
    </div>
    );
}

export default QuestionsPage;
