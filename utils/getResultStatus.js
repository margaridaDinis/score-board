import { CURRENT, MISSED, NOT_PLAYED, SCORED } from './resultContants';

const getResultStatus = ({ isCurrent, result }) => {
  if (isCurrent) return CURRENT;
  if (result === undefined) return NOT_PLAYED;

  return result ? SCORED : MISSED;
};

export default getResultStatus;
