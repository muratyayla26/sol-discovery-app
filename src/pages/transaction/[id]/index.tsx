import { EmptyInfoPage } from "@/components/common/EmptyInfoPage";
import MainCard from "@/components/transaction/MainCard";
import { ITransaction } from "@/types/transaction.interface";
import alchemyAxios from "@/utils/alchemyAxios";
import { clusterHelperAlc } from "@/utils/cluster.helper";
import { Container, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { v4 as uuidv4 } from "uuid";

const Transaction = ({ transaction }: { transaction: ITransaction }) => {
  if (transaction.error || !transaction.result) {
    return (
      <EmptyInfoPage content="Transaction you searched does not exist, or a technical problem has occurred. Please check the transaction number and try again." />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h6">Transaction Details</Typography>
      <MainCard transaction={transaction} />
    </Container>
  );
};

export default Transaction;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { params, query } = context;
    const txnId = params?.id as string;
    const cluster = query.cluster as string;
    const apiUrl = clusterHelperAlc(cluster);

    const data = {
      method: "getTransaction",
      jsonrpc: "2.0",
      params: [txnId, { maxSupportedTransactionVersion: 0 }],
      id: uuidv4(),
    };

    const response = await alchemyAxios.post(apiUrl, data);

    return {
      props: {
        transaction: response.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        transaction: {
          error: true,
        },
      },
    };
  }
};
