import React from 'react';
import PropTypes from 'prop-types';

const PlayerRound = ({
  player,
  isCurrentPlayer,
  currentTryNumber,
  numberOfTries,
  playerResults,
}) => {
  const numberOfTriesArray = Array(numberOfTries).fill(null);

  return (
    <div style={{ opacity: !isCurrentPlayer ? 0.5 : 1 }}>
      {player.name}
      <div>
        {numberOfTriesArray.map((currentTry, i) => (
          <span
            key={i}
            style={{
              color:
                isCurrentPlayer && currentTryNumber === i + 1 ? 'red' : 'black',
            }}
          >
            Item {i} {String(playerResults[i])} {'  | '}
          </span>
        ))}
      </div>
    </div>
  );
};

PlayerRound.propTypes = {
  currentTryNumber: PropTypes.number.isRequired,
  isCurrentPlayer: PropTypes.bool,
  numberOfTries: PropTypes.number,
  player: PropTypes.object.isRequired,
  playerResults: PropTypes.array.isRequired,
};

export default PlayerRound;
