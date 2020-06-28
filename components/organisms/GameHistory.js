import React from 'react';
import PropTypes from 'prop-types';
import { Timeline, Icon } from 'rsuite';
import Link from 'next/link';

const formatDate = (createdAt) => {
  const date = new Date(createdAt);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-UK', options);
};

const GameHistory = ({ games }) => {
  if (!games) return null;

  return (
    <Timeline align='alternate' endless>
      {games.map((game) => (
        <Timeline.Item key={game.id}>
          <Link href={`/game/${game.id}`}>
            <a style={{ color: 'black' }}>
              <small>{formatDate(game.createdAt)}</small>
              <p>
                {game.player1.name} x {game.player2.name}
              </p>
              <small>
                <Icon icon='trophy' style={{ color: '#FFC107' }} />{' '}
                {game.player1.name}
              </small>
            </a>
          </Link>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

GameHistory.propTypes = {
  games: PropTypes.array,
};

export default GameHistory;
