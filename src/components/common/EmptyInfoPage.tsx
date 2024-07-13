import { Stack, Typography } from "@mui/material";

export const EmptyInfoPage = ({ content }: { content: string }) => {
  return (
    <Stack
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      sx={{ p: 3, m: 3 }}
    >
      <Typography variant="subtitle1">{content}</Typography>
    </Stack>
  );
};
