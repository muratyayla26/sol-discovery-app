import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import ClickableText from "../common/ClickableText";
import CopyIconButton from "../common/CopyToClipboard";
import lamportsToSolConvertor from "@/utils/lamportsToSol.convertor";

interface IBalanceChangeTableProps {
  signer: string;
  target: string;
  signerBalanceDiff: number;
  targetBalanceDiff: number;
  signerPreBalance: number;
  signerPostBalance: number;
  targetPreBalance: number;
  targetPostBalance: number;
}

const BalanceChangeTable = ({
  signer,
  target,
  signerBalanceDiff,
  targetBalanceDiff,
  signerPreBalance,
  signerPostBalance,
  targetPreBalance,
  targetPostBalance,
}: IBalanceChangeTableProps) => {
  const balanceDiffColor = (diff: number) =>
    diff > 0 ? "success.main" : diff < 0 ? "error.main" : "text.primary";

  return (
    <TableContainer component={Paper} classes={{ root: "inner-table" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell align="left">Balance Before</TableCell>
            <TableCell align="left">Balance After</TableCell>
            <TableCell align="left">
              <Stack flexDirection="row" alignItems="center">
                <Typography variant="body2">Change (SOL)&nbsp;</Typography>
                <Image
                  src="/assets/sol-logo-transparent.svg"
                  width={16}
                  height={12}
                  alt="solana logo"
                />
              </Stack>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <Stack flexDirection="row" alignItems="center" gap={0.5}>
                <ClickableText content={signer} href={`/account/${signer}`} />
                <CopyIconButton textToCopy={signer} />
              </Stack>
            </TableCell>
            <TableCell align="left">
              {lamportsToSolConvertor(signerPreBalance)}
            </TableCell>
            <TableCell align="left">
              {lamportsToSolConvertor(signerPostBalance)}
            </TableCell>
            <TableCell align="left">
              <Typography
                variant="body2"
                color={balanceDiffColor(signerBalanceDiff)}
              >
                {lamportsToSolConvertor(signerBalanceDiff)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              <Stack flexDirection="row" alignItems="center" gap={0.5}>
                <ClickableText content={target} href={`/account/${target}`} />
                <CopyIconButton textToCopy={target} />
              </Stack>
            </TableCell>
            <TableCell align="left">
              {lamportsToSolConvertor(targetPreBalance)}
            </TableCell>
            <TableCell align="left">
              {lamportsToSolConvertor(targetPostBalance)}
            </TableCell>
            <TableCell align="left">
              <Typography
                variant="body2"
                color={balanceDiffColor(targetBalanceDiff)}
              >
                {lamportsToSolConvertor(targetBalanceDiff)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default BalanceChangeTable;
