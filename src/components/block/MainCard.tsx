import { Card, CardContent, Stack, Typography } from "@mui/material";
import CardRow from "../common/CardRow";
import TimeStamp from "../common/TimeStamp";
import ClickableText from "../common/ClickableText";
import CopyIconButton from "../common/CopyToClipboard";
import lamportsToSolConvertor from "@/utils/lamportsToSol.convertor";
import Image from "next/image";
import { IBlock } from "@/types/block.interface";

const MainCard = ({ block }: { block: IBlock }) => {
  const { result } = block;

  const blockNumber = result.parentSlot;
  const blockTime = result.blockTime;
  const blockhash = result.blockhash;
  const previousBlockhash = result.previousBlockhash;
  const transactionsLength = result.transactions?.length || 0;
  const rewardAccount = result.rewards.find(
    (item) => item.rewardType === "Fee"
  );
  const leader = rewardAccount?.pubkey || "";
  const reward = rewardAccount?.lamports || 0;

  return (
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <CardRow
          firstItem={
            <Typography color="text.secondary" variant="body2">
              Block
            </Typography>
          }
          secondItem={
            <Stack flexDirection="row" alignItems="center" gap={0.5}>
              <Typography variant="body2">{blockNumber}</Typography>
              <CopyIconButton textToCopy={blockNumber} />
            </Stack>
          }
        />
        <CardRow
          firstItem={
            <Typography color="text.secondary" variant="body2">
              Timestamp
            </Typography>
          }
          secondItem={<TimeStamp timestamp={blockTime} />}
        />
        <CardRow
          firstItem={
            <Typography color="text.secondary" variant="body2">
              Block Hash
            </Typography>
          }
          secondItem={<Typography variant="body2">{blockhash}</Typography>}
        />
        <CardRow
          firstItem={
            <Typography color="text.secondary" variant="body2">
              Leader
            </Typography>
          }
          secondItem={
            <Stack flexDirection="row" alignItems="center" gap={0.5}>
              <ClickableText content={leader} href={`/account/${leader}`} />
              <CopyIconButton textToCopy={leader} />
            </Stack>
          }
        />
        <CardRow
          firstItem={
            <Typography color="text.secondary" variant="body2">
              Reward
            </Typography>
          }
          secondItem={
            <Stack flexDirection="row" alignItems="center">
              <Typography variant="body2">
                {lamportsToSolConvertor(reward)} SOL&nbsp;
              </Typography>
              <Image
                src="/assets/sol-logo-transparent.svg"
                width={16}
                height={12}
                alt="solana logo"
              />
            </Stack>
          }
        />
        <CardRow
          firstItem={
            <Typography color="text.secondary" variant="body2">
              Previous Block Hash
            </Typography>
          }
          secondItem={
            <Typography variant="body2">{previousBlockhash}</Typography>
          }
        />
        <CardRow
          firstItem={
            <Typography color="text.secondary" variant="body2">
              Transactions
            </Typography>
          }
          secondItem={
            <Typography variant="body2">
              Total <b>{transactionsLength}</b> transactions
            </Typography>
          }
        />
      </CardContent>
    </Card>
  );
};
export default MainCard;
