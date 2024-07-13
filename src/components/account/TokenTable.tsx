import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ClickableText from "../common/ClickableText";
import lamportsToSolConvertor from "@/utils/lamportsToSol.convertor";
import { ITokenData } from "@/types/account.interface";

const columns: GridColDef[] = [
  {
    field: "account",
    headerName: "Account",
    width: 425,
    valueGetter: (_, row) => row.token_info?.associated_token_address,
    renderCell: (props) => (
      <ClickableText content={props.value} href={`/account/${props.value}`} />
    ),
  },
  {
    field: "token",
    headerName: "Token",
    width: 425,
    valueGetter: (_, row) => row.id,
  },
  {
    field: "tokenBalance",
    headerName: "Token Balance",
    width: 170,
    valueGetter: (_, row) =>
      lamportsToSolConvertor(row.token_info?.balance || 0),
  },
];

const TokenTable = ({ fungibleTokens }: { fungibleTokens: ITokenData[] }) => (
  <DataGrid
    rows={fungibleTokens}
    columns={columns}
    initialState={{
      pagination: {
        paginationModel: { page: 0, pageSize: 10 },
      },
    }}
    pageSizeOptions={[fungibleTokens.length === 0 ? 0 : 10]}
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

export default TokenTable;
