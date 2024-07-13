import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import ClickableText from "../common/ClickableText";
import DoneIcon from "@mui/icons-material/Done";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TimeStamp from "../common/TimeStamp";
import { IAccountData, IAccountTransactions } from "@/types/account.interface";

const columns: GridColDef[] = [
  {
    field: "signature",
    headerName: "Signature",
    width: 350,
    valueGetter: (_, row) => ({
      signature: row.signature,
      err: row.err,
    }),
    renderCell: (props) => (
      <Stack flexDirection="row" alignItems="center" gap={0.5}>
        {!props.value.err ? (
          <DoneIcon sx={{ fontSize: "16px", color: "success.main" }} />
        ) : (
          <ErrorOutlineIcon sx={{ fontSize: "16px", color: "error.main" }} />
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
    valueGetter: (_, row) => row.slot,
    renderCell: (props) => (
      <ClickableText content={props.value} href={`/block/${props.value}`} />
    ),
  },
  {
    field: "time",
    headerName: "Time",
    width: 350,
    valueGetter: (_, row) => row.blockTime,
    renderCell: (props) => <TimeStamp timestamp={props.value} />,
  },
];

const TransactionsTable = ({
  transactions,
}: {
  transactions: IAccountTransactions;
}) => {
  const { result } = transactions;

  const getRowId = (row: IAccountData) => row.signature;

  return (
    <DataGrid
      rows={result}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[result.length === 0 ? 0 : 10]}
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
