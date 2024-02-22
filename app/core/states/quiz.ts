import { create } from 'zustand';
import { IQuiz } from '../interfaces';

type IQuizState = {
  totalCountries: number;
  totalQuestion: number;
  questions: IQuiz[];
  questionIndex: number;
  answersPerQuestion: number;
  correctAnswers: number;
  quizCompleted: boolean;
  endQuiz: () => void;
  startQuiz: (
    questions: IQuiz[],
    totalQuestions: number,
    answersPerQuestion: number,
    totalCountries: number
  ) => void;
  addCorrectedAnswer: () => void;
  updateQuestions: (questions: IQuiz[]) => void;
  nextQuestion: (index: number) => void;
  resetGame: (questions: IQuiz[], correctAnswers: number) => void;
};

export const useQuizState = create<IQuizState>((set, get) => ({
  totalCountries: 0,
  totalQuestion: 0,
  questions: [],
  answersPerQuestion: 0,
  questionIndex: 0,
  correctAnswers: 0,
  quizCompleted: false,
  endQuiz: () => set({ quizCompleted: true }),
  startQuiz: (q, tq, apq, tc) =>
    set({
      questions: q,
      correctAnswers: 0,
      totalQuestion: tq,
      quizCompleted: false,
      answersPerQuestion: apq,
      totalCountries: tc,
      questionIndex: 0
    }),
  addCorrectedAnswer: () => set({ correctAnswers: get().correctAnswers + 1 }),
  updateQuestions: (q) => set({ questions: q }),
  nextQuestion: (i) => set({ questionIndex: i }),
  resetGame: (q, ca) =>
    set({ questions: q, correctAnswers: ca, quizCompleted: false, questionIndex: 0 })
}));
