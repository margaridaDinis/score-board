import React from 'react';
import PropTypes from 'prop-types';
import { FlexboxGrid, Icon } from 'rsuite';

const MatchScore = ({ score, players }) => {
  const [player1Score, player2Score] = score;
  const [player1, player2] = players;

  return (
    <div className='match-score'>
      <FlexboxGrid justify='center' align='middle'>
        <FlexboxGrid.Item className='col'>
          <h1 className='match-score__score alignCenter'>{player1Score}</h1>
          <small className='match-score__player alignCenter'>
            {player1.name}
          </small>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item className='col' colspan={4}>
          <div className='match-score__divider'>
            <Icon icon={'close'} size='2x' />
          </div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item className='col'>
          <h1 className='match-score__score alignCenter'>{player2Score}</h1>
          <small className='match-score__player alignCenter'>
            {player2.name}
          </small>
        </FlexboxGrid.Item>
      </FlexboxGrid>

      <style jsx>
        {`
          .match-score {
            padding-top: 1rem;
          }

          .match-score__player {
            font-size: 0.75rem;
            text-transform: uppercase;
            color: grey;
          }

          .match-score__divider {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
};

MatchScore.propTypes = {
  players: PropTypes.array.isRequired,
  score: PropTypes.array.isRequired,
};

export default MatchScore;
