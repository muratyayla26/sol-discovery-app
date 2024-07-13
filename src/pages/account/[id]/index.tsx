import { Container, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import alchemyAxios from "@/utils/alchemyAxios";
import { v4 as uuidv4 } from "uuid";
import MainCard from "@/components/account/MainCard";
import heliusAxios from "@/utils/heliusAxios";
import AccountTables from "@/components/account/AccountTables";
import {
  IAccountInfo,
  IAccountTokens,
  IAccountTransactions,
  ITokenSeparationAcc,
} from "@/types/account.interface";
import { EmptyInfoPage } from "@/components/common/EmptyInfoPage";
import { IPageErrorData } from "@/types/common.interface";
import { clusterHelperAlc, clusterHelperHls } from "@/utils/cluster.helper";

interface IAccountProps extends IPageErrorData {
  account: IAccountInfo;
  accountId: string;
  transactions: IAccountTransactions;
  tokens: IAccountTokens;
}

const Account = ({ data }: { data: IAccountProps }) => {
  if (
    data.error ||
    !data.account.result ||
    !data.transactions.result ||
    !data.tokens.result
  ) {
    return (
      <EmptyInfoPage content="Account you searched does not exist, or a technical problem has occurred. Please check the account number and try again." />
    );
  }

  const { account, accountId, transactions, tokens } = data;

  const tokensSeparated = tokens.result.items.reduce<ITokenSeparationAcc>(
    (acc, curr) => {
      if (curr.interface === "FungibleToken") {
        acc.fungibleTokens.push(curr);
      } else {
        acc.nfts.push(curr);
      }
      return acc;
    },
    { fungibleTokens: [], nfts: [] }
  );

  const { fungibleTokens, nfts } = tokensSeparated;
  const transactionsLength = transactions.result.length;
  const fungibleTokensLength = fungibleTokens.length;
  const nftsLength = nfts.length;

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h6">Account Details</Typography>
      <MainCard
        account={account}
        accountId={accountId}
        transactionsLength={transactionsLength}
        fungibleTokensLength={fungibleTokensLength}
        nftsLength={nftsLength}
      />
      <AccountTables
        transactions={transactions}
        fungibleTokens={fungibleTokens}
        nfts={nfts}
      />
    </Container>
  );
};

export default Account;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { params, query } = context;
    const accountId = params?.id as string;
    const cluster = query.cluster as string;
    const apiUrlAlc = clusterHelperAlc(cluster);
    const apiUrlHls = clusterHelperHls(cluster);

    const accountPayload = {
      method: "getAccountInfo",
      jsonrpc: "2.0",
      params: [accountId, { encoding: "jsonParsed" }],
      id: uuidv4(),
    };
    const accountRequest = alchemyAxios.post(apiUrlAlc, accountPayload);

    const transactionsPayload = {
      method: "getSignaturesForAddress",
      jsonrpc: "2.0",
      params: [
        accountId,
        { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 },
      ],
      id: uuidv4(),
    };
    const transactionsRequest = await alchemyAxios.post(
      apiUrlAlc,
      transactionsPayload
    );

    const tokensPayload = JSON.stringify({
      jsonrpc: "2.0",
      id: uuidv4(),
      method: "getAssetsByOwner",
      params: {
        ownerAddress: accountId,
        page: 1,
        limit: 1000,
        displayOptions: {
          showFungible: true,
        },
      },
    });
    const tokensRequest = await heliusAxios.post(apiUrlHls, tokensPayload);

    const [
      { data: accountResponse },
      { data: transactionResponse },
      { data: tokensResponse },
    ] = await Promise.all([accountRequest, transactionsRequest, tokensRequest]);

    return {
      props: {
        data: {
          account: accountResponse,
          transactions: transactionResponse,
          tokens: tokensResponse,
          accountId,
        },
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        data: {
          error: true,
        },
      },
    };
  }
};
