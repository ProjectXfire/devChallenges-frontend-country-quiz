export interface IQuiz {
  questionNumber: number;
  question: JSX.Element;
  correctAnswer: string;
  possibleAnswers: string[];
  wasAnswered: boolean;
  myAnswer: null | string;
  myAnswerIndex: null | number;
  isCorrect: null | boolean;
}
