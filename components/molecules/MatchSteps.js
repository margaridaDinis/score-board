import React from 'react';
import PropTypes from 'prop-types';
import { Steps } from 'rsuite';

const MatchSteps = ({ matchIndex, numberOfMatches, matches }) => {
  return (
    <Steps current={matchIndex} small>
      {Array(numberOfMatches)
        .fill(null)
        .map((_, i) => (
          <Steps.Item
            key={i}
            title={
              matches[i]
                ? `${matches[i].scorePlayer1} x ${matches[i].scorePlayer2}`
                : ''
            }
          />
        ))}
    </Steps>
  );
};

MatchSteps.propTypes = {
  matchIndex: PropTypes.number.isRequired,
  matches: PropTypes.array.isRequired,
  numberOfMatches: PropTypes.number.isRequired,
};

export default MatchSteps;
