import { useState, useEffect } from 'react';
import api from '../utils/api';

function useGame({ gameId }) {
  const [game, setGame] = useState(null);

  useEffect(() => {
    function getGame() {
      api
        .get(`/games/${gameId}`)
        .then((res) => {
          const { player1, player2, ...rest } = res.data;
          setGame({ ...rest, players: [player1, player2] });
        })
        .catch(() => setGame({}));
    }

    if (gameId) getGame();
  }, [gameId]);

  return game;
}

export default useGame;
