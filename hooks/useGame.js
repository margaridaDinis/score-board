import { useState, useEffect } from 'react';
import api from '../utils/api';

function useGame({ gameId }) {
  const [game, setGame] = useState(null);

  useEffect(() => {
    function getGame() {
      api
        .get(`/games/${gameId}`)
        .then((res) => setGame(res.data))
        .catch(() => setGame({}));
    }

    if (gameId) getGame();
  }, [gameId]);

  return game;
}

export default useGame;
