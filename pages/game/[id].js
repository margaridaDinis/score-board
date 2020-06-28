import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Timeline, Divider } from 'rsuite';
import api from '../../utils/api';
import MatchScore from '../../components/molecules/MatchScore';

const Game = ({ game, players }) => {
  if (!game) return null;

  const matchWinnerIndexes = useRef([]);
  const [gameWinner, setGameWinner] = useState();
  const [finalScore, setFinalScore] = useState([]);

  useEffect(() => {
    matchWinnerIndexes.current = game.matches.map(
      ({ scorePlayer1, scorePlayer2 }) => {
        if (scorePlayer1 > scorePlayer2) return 0;
        if (scorePlayer1 < scorePlayer2) return 1;

        return -1;
      }
    );
  }, []);

  useEffect(() => {
    const getNumberOfMatchesWon = (playerIndex) =>
      matchWinnerIndexes.current.filter(
        (winnerIndex) => winnerIndex === playerIndex
      ).length;

    const gamesWonByPlayer1 = getNumberOfMatchesWon(0);
    const gamesWonByPlayer2 = getNumberOfMatchesWon(1);

    setFinalScore([gamesWonByPlayer1, gamesWonByPlayer2]);
  }, [matchWinnerIndexes]);

  useEffect(() => {
    const getGameWinner = () => {
      const winnerScore = Math.max(...finalScore);
      const winnerIndex = finalScore.indexOf(winnerScore);

      return players[winnerIndex];
    };

    if (finalScore.length) {
      const winner = getGameWinner();
      setGameWinner(winner);
    }
  }, [finalScore]);

  const getMatchWinner = (i) => {
    if (!players[matchWinnerIndexes.current[i]]) return '';

    return players[matchWinnerIndexes.current[i]].name;
  };

  return (
    <div>
      <h1 className='game__title align-center'>Game results</h1>
      <div className='game__panel'>
        <Timeline align='alternate'>
          {game.matches.map((match, i) => (
            <Timeline.Item key={match.id}>
              <small>
                {match.scorePlayer1} x {match.scorePlayer2}
              </small>
              <p>
                <b>
                  <Icon icon='trophy' style={{ color: '#FFC107' }} />{' '}
                  {getMatchWinner(i)}
                </b>
              </p>
            </Timeline.Item>
          ))}
        </Timeline>
      </div>
      <MatchScore score={finalScore} players={players} />
      <Divider />

      {gameWinner && (
        <div className='game__panel'>
          <p className='game-winner__title align-center text-uppercase'>
            <small>Winner</small>
          </p>
          <h1 className='align-center'>{gameWinner.name}</h1>
        </div>
      )}

      <style jsx>{`
        .game__title {
          padding: 1.5rem 0;
        }

        .game__panel {
          padding: 1.5rem 0;
        }
        .game__winner__title {
          color: grey;
        }
      `}</style>
    </div>
  );
};

Game.propTypes = {
  game: PropTypes.object,
  players: PropTypes.array,
};

export async function getStaticPaths() {
  const res = await api.get('/games');
  const games = res.data;
  const paths = games.map((post) => `/game/${post.id}`);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await api.get(`games/${params.id}`);
  const game = res.data;

  return { props: { game, players: [game.player1, game.player2] } };
}

export default Game;
