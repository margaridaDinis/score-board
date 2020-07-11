import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { Alert, Divider, Loader } from 'rsuite';
import { useEffect, useState } from 'react';
import useGame from '../../../hooks/useGame';
import api from '../../../utils/api';
import MatchActions from '../../../components/molecules/MatchActions';
import MatchScore from '../../../components/molecules/MatchScore';
import PlayerRound from '../../../components/molecules/PlayerRound';
import MatchSteps from '../../../components/molecules/MatchSteps';

function MatchNumber() {
  const router = useRouter();
  const { gameId } = router.query;
  const matchNumber = parseInt(router.query.matchNumber, 10);
  const game = useGame({ gameId });

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentTryNumber, setCurrentTryNumber] = useState(1);
  const [results, setResults] = useState({ 0: [], 1: [] });
  const [score, setScore] = useState([]);

  useEffect(() => {
    if (game && game.isOver) Router.replace(`/game/${gameId}`);
  }, [game]);

  useEffect(() => {
    const score = Object.values(results).map(
      (playerResults) => playerResults.filter(Boolean).length
    );

    setScore(score);
  }, [results]);

  if (!game || game.isOver) {
    return (
      <div className='loader'>
        <Loader size='lg' />
        <style jsx>
          {`
            .loader {
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `}
        </style>
      </div>
    );
  }

  const handleEndOfMatch = async () => {
    const scoreToSubmit = Object.fromEntries(
      score.map((playerScore, i) => [`scorePlayer${i + 1}`, playerScore])
    );

    try {
      const data = { data: { attributes: { ...scoreToSubmit, gameId } } };
      const { data: match } = await api.post('matches', data);

      if (match.game.isOver) return Router.replace(`/game/${gameId}`);

      Router.replace(`/match/${gameId}/${matchNumber + 1}`);
    } catch (e) {
      Alert.error('Oh no! Something went wrong!');
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
    setResults({
      ...results,
      [currentPlayerIndex]: [...results[currentPlayerIndex], result],
    });

    handleNextStep();
  };

  return (
    <main>
      <Head>
        <title>
          Match {matchNumber} of {game.numberOfMatches}
        </title>
      </Head>

      <MatchSteps matchIndex={matchNumber - 1} {...game} />
      <p className='match__title align-center text-uppercase'>
        Match {matchNumber} of {game.numberOfMatches}
      </p>
      <MatchScore score={score} players={game.players} />

      <Divider />
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

      <style jsx>
        {`
          .match__loader {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .match__title {
            padding-top: 2rem;
          }
        `}
      </style>
    </main>
  );
}

export default MatchNumber;
