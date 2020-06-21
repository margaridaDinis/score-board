import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rsuite';

const MatchActions = ({ playerName, currentTryNumber, setThrowResult }) => {
  const setMissed = () => setThrowResult(false);
  const setScored = () => setThrowResult(true);

  return (
    <div>
      <h1>
        {playerName}&apos;s #{currentTryNumber} throw
      </h1>

      <Button onClick={setMissed}>x</Button>
      <Button onClick={setScored}>v</Button>
    </div>
  );
};

MatchActions.propTypes = {
  currentTryNumber: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  setThrowResult: PropTypes.func.isRequired,
};

export default MatchActions;
