import NextImage from 'next/image';
import { type IQuiz, type ICountry } from '@/app/core/interfaces';

const totalQuestionsQuiz = 3;

type ICreateQuiz = {
  allCountries: ICountry[];
  answersOptions: number;
  totalQuestions: number;
};

// Create all the questions with its answers

export function createQuiz(data: ICreateQuiz): IQuiz[] {
  const questions: IQuiz[] = [];

  const { allCountries, answersOptions, totalQuestions } = data;

  const countriesSelected = createPullOfCountries(allCountries, answersOptions * totalQuestions);

  for (let i = 0; i < totalQuestions; i++) {
    const countries = countriesSelected.slice(i * answersOptions, (i + 1) * answersOptions);
    const question = createQuestion(countries, i, answersOptions, totalQuestionsQuiz);
    if (question) questions.push(question);
  }

  return questions;
}

// Select all countries to build the questions

function createPullOfCountries(countries: ICountry[], total: number): ICountry[] {
  const countriesSelected: ICountry[] = [];
  let counter = 0;
  const numbersSelected: Record<number, boolean> = {};

  while (counter < total) {
    const randomNumber = Math.floor(Math.random() * countries.length);
    if (!numbersSelected[randomNumber]) {
      numbersSelected[randomNumber] = true;
      countriesSelected.push(countries[randomNumber]);
      counter++;
    }
  }

  return countriesSelected;
}

// Create the questions with the portion of countries selected

function createQuestion(
  countries: ICountry[],
  questionNumber: number,
  options: number,
  gameQuestions: number
): IQuiz | null {
  const randomCorrectCountry = Math.floor(Math.random() * options);
  const randomGameQuestion = Math.floor(Math.random() * gameQuestions);

  switch (randomGameQuestion) {
    case 0: {
      const correct = countries[randomCorrectCountry];
      const awswers = countries.map((c) => c.name.common);
      return {
        question: <>Which country is {correct.capital[0]} the capital?</>,
        correctAnswer: correct.name.common,
        questionNumber,
        possibleAnswers: awswers,
        wasAnswered: false,
        myAnswer: null,
        myAnswerIndex: null,
        isCorrect: null
      };
    }
    case 1: {
      const correct = countries[randomCorrectCountry];
      const awswers = countries.map((c) => c.capital[0]);
      return {
        question: <>What is the capital of the country {correct.name.common}?</>,
        correctAnswer: correct.capital[0],
        questionNumber,
        possibleAnswers: awswers,
        wasAnswered: false,
        myAnswer: null,
        myAnswerIndex: null,
        isCorrect: null
      };
    }
    case 2: {
      const correct = countries[randomCorrectCountry];
      const awswers = countries.map((c) => c.name.common);
      return {
        question: (
          <>
            Which country does this flag{' '}
            <NextImage
              style={{ objectFit: 'cover' }}
              width={25}
              height={20}
              src={correct.flags.svg}
              alt='flag'
            />{' '}
            belong to?
          </>
        ),
        correctAnswer: correct.name.common,
        questionNumber,
        possibleAnswers: awswers,
        wasAnswered: false,
        myAnswer: null,
        myAnswerIndex: null,
        isCorrect: null
      };
    }
    default: {
      return null;
    }
  }
}
