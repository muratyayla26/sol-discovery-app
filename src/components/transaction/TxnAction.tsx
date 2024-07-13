import { Card, CardContent, Stack, Typography } from "@mui/material";
import CardRow from "../common/CardRow";
import ClickableText from "../common/ClickableText";
import CopyIconButton from "../common/CopyToClipboard";
import Image from "next/image";
import lamportsToSolConvertor from "@/utils/lamportsToSol.convertor";

interface ITxnActionProps {
  signer: string;
  target: string;
  targetBalanceDiff: number;
}

export const TxnAction = ({
  signer,
  target,
  targetBalanceDiff,
}: ITxnActionProps) => {
  return (
    <Card classes={{ root: "inner-card" }}>
      <CardContent>
        <CardRow
          firstItem={<Typography variant="body2">Transfer from</Typography>}
          secondItem={
            <Stack flexDirection="row" alignItems="center" gap={0.5}>
              <ClickableText content={signer} href={`/account/${signer}`} />
              <CopyIconButton textToCopy={signer} />
            </Stack>
          }
          innerItemStyle={{
            firstItemStyle: "0 0 11%",
            secondItemStyle: "0 0 89%",
          }}
        />
        <CardRow
          firstItem={<Typography variant="body2">Transfer to</Typography>}
          secondItem={
            <Stack flexDirection="row" alignItems="center" gap={0.5}>
              <ClickableText content={target} href={`/account/${target}`} />
              <CopyIconButton textToCopy={target} />
            </Stack>
          }
          innerItemStyle={{
            firstItemStyle: "0 0 11%",
            secondItemStyle: "0 0 89%",
          }}
        />
        <CardRow
          firstItem={<Typography variant="body2">Amount</Typography>}
          secondItem={
            <Stack flexDirection="row" alignItems="center">
              <Typography variant="body2">
                {lamportsToSolConvertor(targetBalanceDiff)} SOL&nbsp;
              </Typography>
              <Image
                src="/assets/sol-logo-transparent.svg"
                width={16}
                height={12}
                alt="solana logo"
              />
            </Stack>
          }
          innerItemStyle={{
            firstItemStyle: "0 0 11%",
            secondItemStyle: "0 0 89%",
          }}
        />
      </CardContent>
    </Card>
  );
};
