'use client';

import { useEffect, useState } from 'react';
import { type IQuiz } from '@/app/core/interfaces';
// Services
import { useQuizState } from '@/app/core/states';
import { createQuiz, getCountries } from '../../services';
// Styles
import styles from './game.module.css';
// Components
import QuestionsBall from '../questions-ball/questions-ball';
import Answers from '../answers/answers';
import { initConfigValues } from '@/app/shared/contants';

function Game(): JSX.Element {
  const questions = useQuizState((s) => s.questions);
  const startQuiz = useQuizState((s) => s.startQuiz);
  const questionIndex = useQuizState((s) => s.questionIndex);
  const updateQuestions = useQuizState((s) => s.updateQuestions);
  const nextQuestion = useQuizState((s) => s.nextQuestion);
  const addCorrectedAnswer = useQuizState((s) => s.addCorrectedAnswer);
  const endQuiz = useQuizState((s) => s.endQuiz);

  const onSelectAnswer = (updatedQuestion: IQuiz, wasCorrect: boolean): void => {
    const cloneQuestions = [...questions];
    cloneQuestions.splice(updatedQuestion.questionNumber, 1, updatedQuestion);
    const isQuizCompleted = cloneQuestions.every((cq) => cq.wasAnswered === true);
    updateQuestions(cloneQuestions);
    if (wasCorrect) addCorrectedAnswer();
    if (isQuizCompleted) {
      setTimeout(() => {
        endQuiz();
      }, 1000);
    }
  };

  const onChangeQuestion = (index: number): void => {
    nextQuestion(index);
  };

  const initGame = async () => {
    const countries = await getCountries();
    const { ANSWER_OPTIONS, TOTAL_QUESTIONS } = initConfigValues;
    const questions = createQuiz({
      allCountries: countries,
      answersOptions: ANSWER_OPTIONS,
      totalQuestions: TOTAL_QUESTIONS
    });
    startQuiz(questions, TOTAL_QUESTIONS, ANSWER_OPTIONS, countries.length);
  };

  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (questions.length === 0) return <></>;

  return (
    <div className={styles.game}>
      <p className={styles.game__title}>Country Quiz</p>
      <QuestionsBall
        currentIndex={questionIndex}
        selectQuestion={onChangeQuestion}
        questions={questions}
      />
      <p className={styles['game__question-text']}>{questions[questionIndex].question}</p>

      <Answers question={questions[questionIndex]} answer={onSelectAnswer} />
    </div>
  );
}
export default Game;
