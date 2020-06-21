import Head from 'next/head';
import { useRouter } from 'next/router';
import { Loader, Button } from 'rsuite';
import { useEffect, useState } from 'react';
import useGame from '../../../hooks/useGame';
import api from '../../../utils/api';

function MatchNumber() {
  const router = useRouter();
  const { matchNumber, gameId } = router.query;
  const game = useGame({ gameId });

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentTryNumber, setCurrentTryNumber] = useState(1);
  const [results, setResults] = useState({ 0: [], 1: [] });
  const [score, setScore] = useState([]);

  useEffect(() => {
    const score = Object.values(results).map(
      (playerResults) => playerResults.filter(Boolean).length
    );

    setScore(score);
  }, [results]);

  if (!game) return <Loader />;

  const numberOfTriesArray = Array(game.numberOfTries).fill(null);

  const handleEndOfMatch = async () => {
    const scoreToSubmit = Object.fromEntries(
      score.map((playerScore, i) => [`scorePlayer${i + 1}`, playerScore])
    );

    try {
      const data = { data: { attributes: { ...scoreToSubmit, gameId } } };
      const match = await api.post('/matches', data);

      console.log(match.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleNextStep = () => {
    const isLastTry = currentTryNumber === game.numberOfTries;
    const isLastPlayer = currentPlayerIndex === game.players.length - 1;

    if (isLastTry && isLastPlayer) {
      setCurrentPlayerIndex(-1);
      handleEndOfMatch();

      return;
    }

    if (isLastTry) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setCurrentTryNumber(1);
      return;
    }

    setCurrentTryNumber(currentTryNumber + 1);
  };

  const setThrowResult = (result) => {
    handleNextStep();

    setResults({
      ...results,
      [currentPlayerIndex]: [...results[currentPlayerIndex], result],
    });
  };

  return (
    <div>
      <Head>
        <title>
          Match {matchNumber} of {game.numberOfMatches}
        </title>
      </Head>

      <main>
        <h1>
          Match {matchNumber} of {game.numberOfMatches}
        </h1>

        <h1>{score.join(' x ')}</h1>
        <small>{game.players.map(({ name }) => name)}</small>
        {game.players.map((player, playerIndex) => (
          <div
            key={player.id}
            style={{ opacity: currentPlayerIndex !== playerIndex ? 0.5 : 1 }}
          >
            {player.name}
            <div>
              {numberOfTriesArray.map((currentTry, i) => (
                <span
                  key={i}
                  style={{
                    color:
                      currentPlayerIndex === playerIndex &&
                      currentTryNumber === i + 1
                        ? 'red'
                        : 'black',
                  }}
                >
                  Item {i} {String(results[playerIndex][i])} {'  | '}
                </span>
              ))}
            </div>
          </div>
        ))}
        {currentPlayerIndex >= 0 && (
          <div>
            <h1>
              {game.players[currentPlayerIndex].name}&apos;s #{currentTryNumber}{' '}
              throw
            </h1>

            <Button onClick={() => setThrowResult(false)}>x</Button>
            <Button onClick={() => setThrowResult(true)}>v</Button>
          </div>
        )}
      </main>

      <style jsx>
        {`
          h1 {
            padding-bottom: 1rem;
          }
        `}
      </style>
    </div>
  );
}

export default MatchNumber;
