'use client';

import NextImage from 'next/image';
// Services
import { useQuizState } from '@/app/core/states';
import { createQuiz, getCountries } from '../../services';
// Styles
import styles from './completed.module.css';

function Completed() {
  const correctAnswers = useQuizState((s) => s.correctAnswers);
  const totalQuestions = useQuizState((s) => s.totalQuestion);
  const answersPerQuestion = useQuizState((s) => s.answersPerQuestion);
  const resetGame = useQuizState((s) => s.resetGame);

  const reset = async (): Promise<void> => {
    const countries = await getCountries();
    const questions = createQuiz({
      allCountries: countries,
      answersOptions: answersPerQuestion,
      totalQuestions
    });
    resetGame(questions, 0);
  };

  return (
    <div className={styles.completed}>
      <div className={styles.completed__header}>
        <NextImage fill src='/images/congrats.svg' alt='congrats' />
      </div>
      <p className={styles.completed__title}>Congrats! You completed the quiz</p>
      <p className={styles.completed__text}>
        Your answer {correctAnswers}/{totalQuestions} correctly
      </p>
      <button className={styles.completed__reset} type='button' onClick={reset}>
        Play again
      </button>
    </div>
  );
}
export default Completed;
