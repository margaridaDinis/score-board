import Head from 'next/head';
import { useRouter } from 'next/router';
import { FlexboxGrid, Loader } from 'rsuite';
import { useEffect, useState } from 'react';
import useGame from '../../../hooks/useGame';
import api from '../../../utils/api';
import MatchActions from '../../../components/molecules/MatchActions';
import MatchScore from '../../../components/molecules/MatchScore';
import PlayerRound from '../../../components/molecules/PlayerRound';

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
        <FlexboxGrid justify='center'>
          <FlexboxGrid.Item>
            <h1>
              Match {matchNumber} of {game.numberOfMatches}
              {/*  TODO add steps */}
            </h1>

            <MatchScore score={score} players={game.players} />
            {game.players.map((player, playerIndex) => (
              <PlayerRound
                key={player.id}
                player={player}
                isCurrentPlayer={playerIndex === currentPlayerIndex}
                playerResults={results[playerIndex]}
                currentTryNumber={currentTryNumber}
                {...game}
              />
            ))}
            {currentPlayerIndex >= 0 && (
              <MatchActions
                currentTryNumber={currentTryNumber}
                playerName={game.players[currentPlayerIndex].name}
                setThrowResult={setThrowResult}
              />
            )}
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </main>
    </div>
  );
}

export default MatchNumber;
