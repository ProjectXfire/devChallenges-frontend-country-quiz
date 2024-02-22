'use client';

import { useQuizState } from './core/states';
// Components
import { Block, Completed, Container, Game } from './quiz/components';

export default function Home() {
  const quizStatus = useQuizState((s) => s.quizCompleted);

  return (
    <Container>
      {quizStatus ? (
        <Block maxWidth={400}>
          <Completed />
        </Block>
      ) : (
        <Block maxWidth={700}>
          <Game />
        </Block>
      )}
    </Container>
  );
}
