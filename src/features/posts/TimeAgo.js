import {parseISO, formatDistanceToNow} from "date-fns";
import {UilClockTen} from "@iconscout/react-unicons";

const TimeAgo = ({timestamp}) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp}>
      <UilClockTen size="16" color="#0092E4" />
      <span className="time">{timeAgo}</span>
    </span>
  );
};
export default TimeAgo;
