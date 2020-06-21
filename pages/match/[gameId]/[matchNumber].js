import Head from 'next/head';
import { useRouter } from 'next/router';
import { Loader, Button } from 'rsuite';
import { useEffect, useState } from 'react';
import api from '../../../utils/api';

function MatchNumber() {
  const router = useRouter();
  const [game, setGame] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState();
  const [currentTryNumber, setCurrentTryNumber] = useState(1);
  const { matchNumber, gameId } = router.query;
  const [values, setValues] = useState({});

  useEffect(() => {
    function getGame() {
      api
        .get(`/games/${gameId}`)
        .then((res) => {
          setCurrentPlayer(res.data.player);
          setValues({
            [res.data.player.id]: [],
            [res.data.player2.id]: [],
          });
          setGame(res.data);
        })
        .catch(() => setGame({}));
    }

    if (gameId) getGame();
  }, [gameId]);

  if (!game) return <Loader />;

  const numberOfTriesArray = Array(game.numberOfTries).fill(null);

  const handleNextStep = () => {
    const isLastTry = currentTryNumber === game.numberOfTries;
    const isPlayer2 = currentPlayer.id === game.player2.id;

    if (isLastTry && isPlayer2) {
      setCurrentPlayer({});

      console.log('end of the game');
    } else if (isLastTry) {
      setCurrentPlayer(game.player2);
      setCurrentTryNumber(1);
    } else {
      setCurrentTryNumber(currentTryNumber + 1);
    }
  };

  const setThrowResult = (result) => {
    handleNextStep();

    setValues({
      ...values,
      [currentPlayer.id]: [...values[currentPlayer.id], result],
    });
  };

  return (
    <div>
      <Head>
        <title>Match {matchNumber}</title>
      </Head>

      <main>
        <h1>Match {matchNumber}</h1>

        <div style={{ opacity: currentPlayer.id !== game.player.id ? 0.5 : 1 }}>
          {game.player.name}
          <div>
            {numberOfTriesArray.map((currentTry, i) => (
              <span
                key={i}
                style={{
                  color:
                    currentPlayer.id === game.player.id &&
                    currentTryNumber === i + 1
                      ? 'red'
                      : 'black',
                }}
              >
                Item {i} {String(values[game.player.id][i])} {'  | '}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{ opacity: currentPlayer.id !== game.player2.id ? 0.5 : 1 }}
        >
          {game.player2.name}
          <div>
            {numberOfTriesArray.map((currentTry, i) => (
              <span
                key={i}
                style={{
                  color:
                    currentPlayer.id === game.player2.id &&
                    currentTryNumber === i + 1
                      ? 'red'
                      : 'black',
                }}
              >
                Item {i} {String(values[game.player2.id][i])} {'  | '}
              </span>
            ))}
          </div>
        </div>

        {currentPlayer && currentPlayer.name && (
          <div>
            <h1>
              {currentPlayer.name}&apos;s #{currentTryNumber} throw
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
