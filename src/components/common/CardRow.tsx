import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";

const CardRow = ({
  firstItem,
  secondItem,
  innerItemStyle,
  parentItemAlign,
}: {
  firstItem: ReactNode;
  secondItem: ReactNode;
  innerItemStyle?: { firstItemStyle: string; secondItemStyle: string };
  parentItemAlign?: string;
}) => {
  return (
    <Stack
      sx={{ mb: 2, "&:last-child": { mb: 0 } }}
      flexDirection="row"
      alignItems={parentItemAlign || "center"}
      justifyContent="flex-start"
    >
      <Box
        sx={{
          flex: innerItemStyle?.firstItemStyle || "0 0 17%",
        }}
      >
        {firstItem}
      </Box>
      <Box
        sx={{
          flex: innerItemStyle?.secondItemStyle || "0 0 83%",
        }}
      >
        {secondItem}
      </Box>
    </Stack>
  );
};
export default CardRow;
