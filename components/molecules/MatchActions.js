import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Icon, Divider, FlexboxGrid } from 'rsuite';

const MatchActions = ({ playerName, currentTryNumber, setThrowResult }) => {
  const setMissed = () => setThrowResult(false);
  const setScored = () => setThrowResult(true);

  return (
    <>
      <Divider />
      <article>
        <header>
          <p className='match-actions__player text-uppercase'>
            <b>{playerName}</b> playing
          </p>
        </header>

        <FlexboxGrid justify='space-around'>
          <FlexboxGrid.Item>
            <IconButton
              color='red'
              icon={<Icon icon='close' />}
              circle
              size='lg'
              onClick={setMissed}
            />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item>
            <IconButton
              color='green'
              icon={<Icon icon='check' />}
              circle
              size='lg'
              onClick={setScored}
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <footer>
          <p className='match-actions__turn align-center text-uppercase'>
            #{currentTryNumber} turn
          </p>
        </footer>
      </article>
      <style jsx>
        {`
          .match-actions__player {
            padding-bottom: 2rem;
          }

          .match-actions__turn {
            padding-top: 2rem;
          }
        `}
      </style>
    </>
  );
};

MatchActions.propTypes = {
  currentTryNumber: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  setThrowResult: PropTypes.func.isRequired,
};

export default MatchActions;
