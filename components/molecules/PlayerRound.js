import React from 'react';
import PropTypes from 'prop-types';
import { FlexboxGrid, Icon } from 'rsuite';
import { COLOR, ICON } from '../../utils/resultContants';
import getResultStatus from '../../utils/getResultStatus';

const PlayerRound = ({
  player,
  isCurrentPlayer,
  currentTryNumber,
  numberOfTries,
  playerResults,
}) => {
  const numberOfTriesArray = Array(numberOfTries).fill(null);

  const renderResult = (i) => {
    const isCurrent = isCurrentPlayer && currentTryNumber === i + 1;
    const result = playerResults[i];
    const status = getResultStatus({ isCurrent, result });

    return (
      <Icon
        icon={ICON[status]}
        style={{ color: COLOR[status] }}
        className='player-round__result'
        size='3x'
        spin={isCurrent}
      />
    );
  };

  return (
    <div
      className='player-round'
      style={{ opacity: !isCurrentPlayer ? 0.5 : 1 }}
    >
      <p className='player-round__player'>{player.name}</p>
      <FlexboxGrid justify='space-between'>
        {numberOfTriesArray.map((currentTry, i) => (
          <FlexboxGrid.Item key={i} justify='center'>
            {renderResult(i)}
          </FlexboxGrid.Item>
        ))}
      </FlexboxGrid>
      <style jsx>
        {`
          .player-round {
            padding: 1rem 0;
          }

          .player-round__player {
            padding-bottom: 1rem;
            text-transform: uppercase;
          }
        `}
      </style>
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
