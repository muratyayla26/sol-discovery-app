import { useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import lamportsToSolConvertor from "@/utils/lamportsToSol.convertor";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import ClickableText from "../common/ClickableText";
import { IBlock, IBlockTransaction } from "@/types/block.interface";
import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const TransactionsTable = ({ block }: { block: IBlock }) => {
  const {
    result: { transactions, parentSlot },
  } = block;

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "signature",
        headerName: "Signature",
        width: 350,
        valueGetter: (_, row) => ({
          signature: row.transaction.signatures[0],
          err: row.meta.err,
        }),
        renderCell: (props) => (
          <Stack flexDirection="row" alignItems="center" gap={0.5}>
            {!props.value.err ? (
              <DoneIcon sx={{ fontSize: "16px", color: "success.main" }} />
            ) : (
              <ErrorOutlineIcon
                sx={{ fontSize: "16px", color: "error.main" }}
              />
            )}
            <ClickableText
              content={props.value.signature}
              href={`/transaction/${props.value.signature}`}
            />
          </Stack>
        ),
        cellClassName: "signatureCell",
      },
      {
        field: "block",
        headerName: "Block",
        width: 160,
        valueGetter: () => parentSlot,
      },
      {
        field: "by",
        headerName: "By",
        width: 450,
        valueGetter: (_, row: IBlockTransaction) =>
          row.transaction.message.accountKeys.find((key) => key.signer)?.pubkey,
        renderCell: (props) => (
          <ClickableText
            content={props.value}
            href={`/account/${props.value}`}
          />
        ),
      },
      {
        field: "fee",
        headerName: "Fee (SOL)",
        width: 170,
        valueGetter: (_, row) => lamportsToSolConvertor(row.meta.fee),
        renderCell: (props) => (
          <Stack flexDirection="row" alignItems="center">
            <Image
              src="/assets/sol-logo-transparent.svg"
              width={16}
              height={12}
              alt="solana logo"
            />
            <Typography variant="body2">&nbsp;{props.value}</Typography>
          </Stack>
        ),
      },
    ],
    [parentSlot]
  );

  const getRowId = (row: IBlockTransaction) => row.transaction.signatures[0];

  return (
    <DataGrid
      rows={transactions}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[transactions.length === 0 ? 0 : 10]}
      getRowId={getRowId}
      disableColumnMenu
      disableColumnSorting
      disableDensitySelector
      disableColumnSelector
      disableColumnResize
      disableColumnFilter
      disableAutosize
      disableMultipleRowSelection
      disableRowSelectionOnClick
      sx={{ mb: 3 }}
    />
  );
};

export default TransactionsTable;
