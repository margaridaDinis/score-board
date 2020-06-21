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
          <h1>
            {playerName}&apos;s #{currentTryNumber} throw
          </h1>
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
      </article>
      <Divider />
      <style jsx>
        {`
          header {
            text-align: center;
          }
          h1 {
            padding-bottom: 2rem;
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
