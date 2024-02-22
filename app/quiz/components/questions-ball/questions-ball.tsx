'use client';

import { type IQuiz } from '@/app/core/interfaces';
// Styles
import styles from './questions-ball.module.css';

interface Props {
  currentIndex: number;
  selectQuestion: (index: number) => void;
  questions: IQuiz[];
}

function QuestionsBall({ currentIndex, selectQuestion, questions }: Props): JSX.Element {
  return (
    <ul className={styles['questions-ball']}>
      {questions.map((q, i) => (
        <li key={q.questionNumber}>
          <button
            className={`${styles['questions-ball__ball']} ${
              (currentIndex === i || q.wasAnswered) && styles['active-ball']
            }`}
            type='button'
            onClick={() => selectQuestion(i)}
          >
            {i + 1}
          </button>
        </li>
      ))}
    </ul>
  );
}
export default QuestionsBall;
