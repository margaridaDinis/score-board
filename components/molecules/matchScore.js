import React from 'react';
import PropTypes from 'prop-types';

const MatchScore = ({ score, players }) => (
  <>
    <h1>{score.join(' x ')}</h1>
    <small>{players.map(({ name }) => name)}</small>
  </>
);

MatchScore.propTypes = {
  players: PropTypes.array.isRequired,
  score: PropTypes.array.isRequired,
};

export default MatchScore;
