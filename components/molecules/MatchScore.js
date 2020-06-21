import React from 'react';
import PropTypes from 'prop-types';
import { Divider, FlexboxGrid, Icon } from 'rsuite';

const MatchScore = ({ score, players }) => {
  const [player1Score, player2Score] = score;
  const [player1, player2] = players;

  return (
    <div className='match-score'>
      <Divider />

      <FlexboxGrid justify='center' align='center'>
        <FlexboxGrid.Item className='col'>
          <h1 className='match-score__score'>{player1Score}</h1>
          <small className='match-score__player'>{player1.name}</small>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item className='col' colspan={4}>
          <div className='match-score__divider'>
            <Icon icon={'close'} size='2x' />
          </div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item className='col'>
          <h1 className='match-score__score'>{player2Score}</h1>
          <small className='match-score__player'>{player2.name}</small>
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <Divider />

      <style jsx>
        {`
          .match-score {
            padding: 1rem 0;
          }

          .match-score__score {
            text-align: center;
          }

          .match-score__player {
            text-align: center;
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
