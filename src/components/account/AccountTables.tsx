import NFTTable from "./NFTTable";
import TokenTable from "./TokenTable";
import TransactionsTable from "./TransactionsTable";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ReactNode, SyntheticEvent, useState } from "react";
import { IAccountTransactions, ITokenData } from "@/types/account.interface";

interface ITabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

interface IAccountTablesProps {
  transactions: IAccountTransactions;
  fungibleTokens: ITokenData[];
  nfts: ITokenData[];
}

const CustomTabPanel = (props: ITabPanelProps) => {
  const { children, value, index, ...other } = props;

  return <div {...other}>{value === index && <Box>{children}</Box>}</div>;
};

const AccountTables = ({
  transactions,
  fungibleTokens,
  nfts,
}: IAccountTablesProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Transactions" />
          <Tab label="Tokens" />
          <Tab label="NFTs" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TransactionsTable transactions={transactions} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TokenTable fungibleTokens={fungibleTokens} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <NFTTable nfts={nfts} />
      </CustomTabPanel>
    </Box>
  );
};
export default AccountTables;
