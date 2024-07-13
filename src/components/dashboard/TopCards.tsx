import Image from "next/image";
import lamportsToSolConvertor from "@/utils/lamportsToSol.convertor";
import {
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import ClickableText from "../common/ClickableText";
import CopyIconButton from "../common/CopyToClipboard";
import { IEpoch, ISupply } from "@/types/dashboard.interface";

interface ITopCardsProps {
  supply: ISupply;
  epoch: IEpoch;
}

const TopCards = ({ supply, epoch }: ITopCardsProps) => {
  const { result: supplyResult } = supply;
  const { result: epochResult } = epoch;
  const totalSupply = lamportsToSolConvertor(supplyResult.value.total);
  const circulatingSupply = lamportsToSolConvertor(
    supplyResult.value.circulating
  );
  const circulatingPercentage = (
    (circulatingSupply / totalSupply) *
    100
  ).toFixed(2);
  const nonCirculatingSupply = lamportsToSolConvertor(
    supplyResult.value.nonCirculating
  );
  const noncirculatingPercentage = (
    (nonCirculatingSupply / totalSupply) *
    100
  ).toFixed(2);
  const currentEpoch = epochResult.epoch;
  const epochProgress = (
    (epochResult.slotIndex / epochResult.slotsInEpoch) *
    100
  ).toFixed(2);
  const txnCount = epochResult.transactionCount;
  const blockHeight = epochResult.blockHeight;
  const slotHeight = epochResult.absoluteSlot;

  return (
    <Stack
      sx={{ mt: 3 }}
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      gap={3}
    >
      <Card sx={{ height: 243, width: "100%" }}>
        <CardContent>
          <Stack flexDirection="row" alignItems="center">
            <Typography variant="subtitle2" color="text.secondary">
              SOL Supply&nbsp;
            </Typography>
            <Image
              src="/assets/sol-logo-transparent.svg"
              width={16}
              height={12}
              alt="solana logo"
            />
          </Stack>
          <Typography variant="subtitle1" fontWeight="fontWeightMedium">
            {totalSupply.toLocaleString()}
          </Typography>
          <Card classes={{ root: "inner-card" }} sx={{ height: 135, mt: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Circulating Supply
              </Typography>
              <Typography variant="subtitle2" fontWeight="fontWeightMedium">
                {circulatingSupply.toLocaleString()}&nbsp;(
                {circulatingPercentage}%)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Non-circulating Supply
              </Typography>
              <Typography variant="subtitle2" fontWeight="fontWeightMedium">
                {nonCirculatingSupply.toLocaleString()}&nbsp;(
                {noncirculatingPercentage}%)
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card sx={{ height: 243, width: "100%" }}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            Transactions
          </Typography>
          <Typography variant="subtitle1" fontWeight="fontWeightMedium">
            {txnCount.toLocaleString()}
          </Typography>
          <Card classes={{ root: "inner-card" }} sx={{ height: 135, mt: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Block Height
              </Typography>
              <Typography variant="subtitle2" fontWeight="fontWeightMedium">
                {blockHeight.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Slot Height
              </Typography>
              <Stack flexDirection="row" alignItems="center" gap={0.5}>
                <ClickableText
                  content={slotHeight.toLocaleString()}
                  href={`/block/${slotHeight}`}
                />
                <CopyIconButton textToCopy={slotHeight} />
              </Stack>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card sx={{ height: 243, width: "100%" }}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            Current Epoch
          </Typography>
          <Typography variant="subtitle1" fontWeight="fontWeightMedium">
            {currentEpoch}
          </Typography>
          <Card classes={{ root: "inner-card" }} sx={{ height: 135, mt: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Epoch Progress
              </Typography>
              <Typography variant="subtitle2" fontWeight="fontWeightMedium">
                {epochProgress}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Number(epochProgress)}
                color="success"
                sx={{ mt: 0.5, borderRadius: "3px" }}
              />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </Stack>
  );
};
export default TopCards;
