export interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty?: string;
  duration?: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correct: string;
  quiz: string;
}
