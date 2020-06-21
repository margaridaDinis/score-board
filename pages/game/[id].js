import React from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';

const Game = ({ game }) => {
  return (
    <div>
      <h1>Game {game.id}</h1>
    </div>
  );
};

Game.propTypes = {
  game: PropTypes.object,
}

export async function getStaticPaths() {
  const res = await api('/games');
  const games = res.data;
  const paths = games.map((post) => `/game/${post.id}`);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await api(`games/${params.id}`);
  const game = res.data;

  return { props: { game } };
}

export default Game;

