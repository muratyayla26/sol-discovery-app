import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import CardRow from "../common/CardRow";
import ClickableText from "../common/ClickableText";
import CopyIconButton from "../common/CopyToClipboard";
import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TimeStamp from "../common/TimeStamp";
import lamportsToSolConvertor from "@/utils/lamportsToSol.convertor";
import BalanceChangeTable from "./BalanceChangeTable";
import { TxnAction } from "./TxnAction";
import Image from "next/image";
import { ITransaction } from "@/types/transaction.interface";

const MainCard = ({ transaction }: { transaction: ITransaction }) => {
  const { result } = transaction;
  const txnSignature = result.transaction.signatures[0];
  const blockNumber = result.slot;
  const blockTime = result.blockTime;
  const errStatus = result.meta.err;
  const signer = result.transaction.message.accountKeys[0];
  const target = result.transaction.message.accountKeys[1];
  const txnFee = result.meta.fee;
  const prevBlockHash = result.transaction.message.recentBlockhash;
  const signerPreBalance = result.meta.preBalances[0];
  const signerPostBalance = result.meta.postBalances[0];
  const targetPreBalance = result.meta.preBalances[1];
  const targetPostBalance = result.meta.postBalances[1];
  const targetBalanceDiff =
    result.meta.postBalances[1] - result.meta.preBalances[1];
  const signerBalanceDiff =
    result.meta.postBalances[0] - result.meta.preBalances[0];

  return (
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <CardRow
          firstItem={
            <Typography color="text.secondary" variant="body2">
              Signature
            </Typography>
          }
          secondItem={
            <Stack flexDirection="row" alignItems="center" gap={0.5}>
              <Typography variant="body2">{txnSignature}</Typography>
              <CopyIconButton textToCopy={txnSignature} />
            </Stack>
          }
        />
        <CardRow
          firstItem={
            <Typography color="text.secondary" variant="body2">
              Block
            </Typography>
          }
          secondItem={
            <Stack flexDirection="row" alignItems="center" gap={0.5}>
              <ClickableText
                content={blockNumber}
                href={`/block/${blockNumber}`}
              />
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
              Result
            </Typography>
          }
          secondItem={
            errStatus === null ? (
              <Chip
                icon={<DoneIcon />}
                label="Success"
                size="small"
                color="success"
              />
            ) : (
              <Chip
                icon={<ErrorOutlineIcon />}
                label="Failed"
                size="small"
                color="error"
              />
            )
          }
        />
        <CardRow
          firstItem={
            <Typography color="text.secondary" variant="body2">
              Signer
            </Typography>
          }
          secondItem={
            <Stack flexDirection="row" alignItems="center" gap={0.5}>
              <ClickableText content={signer} href={`/account/${signer}`} />
              <CopyIconButton textToCopy={signer} />
            </Stack>
          }
        />
        <CardRow
          firstItem={
            <Typography color="text.secondary" variant="body2">
              Fee
            </Typography>
          }
          secondItem={
            <Stack flexDirection="row" alignItems="center">
              <Typography variant="body2">
                {lamportsToSolConvertor(txnFee)} SOL&nbsp;
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
          secondItem={<Typography variant="body2">{prevBlockHash}</Typography>}
        />
        {targetBalanceDiff > 0 && (
          <CardRow
            firstItem={
              <Typography color="text.secondary" variant="body2">
                Transaction Action
              </Typography>
            }
            secondItem={
              <TxnAction
                signer={signer}
                target={target}
                targetBalanceDiff={targetBalanceDiff}
              />
            }
            parentItemAlign="flex-start"
          />
        )}
        <CardRow
          firstItem={
            <Typography color="text.secondary" variant="body2">
              SOL Balance Change
            </Typography>
          }
          secondItem={
            <BalanceChangeTable
              signer={signer}
              target={target}
              signerBalanceDiff={signerBalanceDiff}
              targetBalanceDiff={targetBalanceDiff}
              signerPreBalance={signerPreBalance}
              signerPostBalance={signerPostBalance}
              targetPreBalance={targetPreBalance}
              targetPostBalance={targetPostBalance}
            />
          }
          parentItemAlign="flex-start"
        />
      </CardContent>
    </Card>
  );
};
export default MainCard;
