import { useState, useEffect } from 'react';

function useGame({ gameId }) {
  const [game, setGame] = useState({});

  useEffect(() => {
    function getGame() {
      fetch(`https://5eecd9014cbc340016330ad9.mockapi.io/games/${gameId}`)
        .then((res) => res.json())
        .then(setGame)
        .catch(() => setGame({}));
    }

    if (gameId) getGame();
  }, [gameId]);

  return game;
}

export default useGame;
