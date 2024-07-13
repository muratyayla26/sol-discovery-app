import { IAccountInfo } from "@/types/account.interface";
import lamportsToSolConvertor from "@/utils/lamportsToSol.convertor";
import InfoIcon from "@mui/icons-material/Info";
import {
  Card,
  CardContent,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import CardRow from "../common/CardRow";
import ClickableText from "../common/ClickableText";
import CopyIconButton from "../common/CopyToClipboard";

interface IMainCardProps {
  account: IAccountInfo;
  accountId: string;
  transactionsLength: number;
  fungibleTokensLength: number;
  nftsLength: number;
}

const MainCard = ({
  account,
  accountId,
  transactionsLength,
  fungibleTokensLength,
  nftsLength,
}: IMainCardProps) => {
  const {
    result: { value },
  } = account;
  const owner = value?.owner;
  const balance = value?.lamports;
  const executable = value?.executable;
  const totalTokens = fungibleTokensLength + nftsLength;

  return (
    <Card sx={{ mt: 1 }}>
      <CardContent>
        <CardRow
          firstItem={
            <Typography color="text.secondary" variant="body2">
              Account
            </Typography>
          }
          secondItem={
            <Stack flexDirection="row" alignItems="center" gap={0.5}>
              <Typography variant="body2">{accountId}</Typography>
              <CopyIconButton textToCopy={accountId} />
            </Stack>
          }
          innerItemStyle={{
            firstItemStyle: "0 0 7%",
            secondItemStyle: "0 0 93%",
          }}
        />
        <Stack
          flexDirection="row"
          gap={2}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Card
            classes={{ root: "inner-card" }}
            sx={{ height: 227, width: 400 }}
          >
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Overview
              </Typography>
              <CardRow
                firstItem={
                  <Typography color="text.secondary" variant="body2">
                    SOL Balance
                  </Typography>
                }
                secondItem={
                  <Stack flexDirection="row" alignItems="center" gap={0.5}>
                    <Typography variant="body2">
                      {lamportsToSolConvertor(balance)} SOL
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
                  firstItemStyle: "0 0 30%",
                  secondItemStyle: "0 0 70%",
                }}
              />
              <CardRow
                firstItem={
                  <Typography color="text.secondary" variant="body2">
                    Transactions
                  </Typography>
                }
                secondItem={
                  <Stack flexDirection="row" alignItems="center" gap={0.5}>
                    <Typography variant="body2">
                      Total <b>{transactionsLength}</b> transaction(s)
                    </Typography>
                    {transactionsLength >= 1000 && (
                      <Tooltip title="The number of transactions is shown up to a maximum of 1000.">
                        <InfoIcon
                          color="info"
                          sx={{ fontSize: "18px", cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </Stack>
                }
                innerItemStyle={{
                  firstItemStyle: "0 0 30%",
                  secondItemStyle: "0 0 70%",
                }}
              />
              <CardRow
                firstItem={
                  <Typography color="text.secondary" variant="body2">
                    Tokens
                  </Typography>
                }
                secondItem={
                  <Stack flexDirection="row" alignItems="center" gap={0.5}>
                    <Typography variant="body2">
                      <b>{fungibleTokensLength}</b> token(s)
                    </Typography>
                    {totalTokens >= 1000 && (
                      <Tooltip title="The total number of tokens and NFTs is shown up to a maximum of 1000.">
                        <InfoIcon
                          color="info"
                          sx={{ fontSize: "18px", cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </Stack>
                }
                innerItemStyle={{
                  firstItemStyle: "0 0 30%",
                  secondItemStyle: "0 0 70%",
                }}
              />
              <CardRow
                firstItem={
                  <Typography color="text.secondary" variant="body2">
                    NFTs
                  </Typography>
                }
                secondItem={
                  <Stack flexDirection="row" alignItems="center" gap={0.5}>
                    <Typography variant="body2">
                      <b>{nftsLength}</b> NFT(s)
                    </Typography>
                    {totalTokens >= 1000 && (
                      <Tooltip title="The total number of tokens and NFTs is shown up to a maximum of 1000.">
                        <InfoIcon
                          color="info"
                          sx={{ fontSize: "18px", cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </Stack>
                }
                innerItemStyle={{
                  firstItemStyle: "0 0 30%",
                  secondItemStyle: "0 0 70%",
                }}
              />
            </CardContent>
          </Card>
          <Card
            classes={{ root: "inner-card" }}
            sx={{ height: 227, width: 400 }}
          >
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Information
              </Typography>
              <CardRow
                firstItem={
                  <Typography color="text.secondary" variant="body2">
                    Owner
                  </Typography>
                }
                secondItem={
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{
                      "& .MuiTypography-root": {
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "200px",
                      },
                    }}
                  >
                    <ClickableText content={owner} href={`/account/${owner}`} />
                    <CopyIconButton textToCopy={owner} />
                  </Stack>
                }
                innerItemStyle={{
                  firstItemStyle: "0 0 30%",
                  secondItemStyle: "0 0 70%",
                }}
              />
              <CardRow
                firstItem={
                  <Typography color="text.secondary" variant="body2">
                    Executable
                  </Typography>
                }
                secondItem={
                  executable ? (
                    <Chip label="True" size="small" color="success" />
                  ) : (
                    <Chip label="False" size="small" color="error" />
                  )
                }
                innerItemStyle={{
                  firstItemStyle: "0 0 30%",
                  secondItemStyle: "0 0 70%",
                }}
              />
            </CardContent>
          </Card>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default MainCard;
