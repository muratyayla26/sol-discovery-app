import dayjs from "dayjs";
import dayjsPluginRelativeTime from "dayjs/plugin/relativeTime";
import dayjsPluginUTC from "dayjs/plugin/utc";

dayjs.extend(dayjsPluginUTC);
dayjs.extend(dayjsPluginRelativeTime);

export const formatTimestamp = (timestamp: number): [string, string] => {
  const timestampInUTC = dayjs.unix(timestamp).utc();

  const relativeTime = timestampInUTC.fromNow();

  const formattedDateTime = timestampInUTC.format(
    "MMMM DD, YYYY HH:mm:ss [UTC]"
  );

  return [relativeTime, formattedDateTime];
};
