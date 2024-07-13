import { formatTimestamp } from "@/utils/timestamp.helper";
import { Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TimeStamp = ({ timestamp }: { timestamp: number }) => {
  const [relativeTime, formattedTime] = formatTimestamp(timestamp);

  return (
    <Stack flexDirection="row" alignItems="center">
      <Typography variant="body2">{relativeTime}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
        |
      </Typography>
      <AccessTimeIcon
        sx={{
          fontSize: "18px",
          color: "text.secondary",
          mr: 0.2,
          mt: 0.1,
        }}
      />
      <Typography variant="body2" color="text.secondary">
        {formattedTime}
      </Typography>
    </Stack>
  );
};

export default TimeStamp;
