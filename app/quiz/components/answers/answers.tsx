'use client';

import NextImage from 'next/image';
import { type IQuiz } from '@/app/core/interfaces';
// Styles
import styles from './answers.module.css';

interface Props {
  answer: (question: IQuiz, wasCorrect: boolean) => void;
  question: IQuiz;
}

function Answers({ answer, question }: Props): JSX.Element {
  const onSelectAnswer = (value: string, index: number, q: IQuiz): void => {
    const updateQuestion = { ...q };
    updateQuestion.myAnswer = value;
    updateQuestion.wasAnswered = true;
    updateQuestion.isCorrect = value === q.correctAnswer;
    updateQuestion.myAnswerIndex = index;
    answer(updateQuestion, value === q.correctAnswer);
  };

  return (
    <ul className={styles.answers}>
      {question.possibleAnswers.map((opt, i) => (
        <li key={i}>
          <button
            className={`${styles.answers__option} ${
              question.myAnswerIndex === i && styles['answer-selected']
            }`}
            type='button'
            disabled={question.wasAnswered}
            onClick={() => onSelectAnswer(opt, i, question)}
          >
            {opt}
            {question.myAnswerIndex === i ? (
              question.correctAnswer === question.myAnswer ? (
                <NextImage width={20} height={20} src='/icons/Check_round_fill.svg' alt='icon' />
              ) : (
                <NextImage width={20} height={20} src='/icons/Close_round_fill.svg' alt='icon' />
              )
            ) : (
              question.correctAnswer === opt &&
              question.myAnswer && (
                <NextImage width={20} height={20} src='/icons/Check_round_fill.svg' alt='icon' />
              )
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Answers;
