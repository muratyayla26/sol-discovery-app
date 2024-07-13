import { Container, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import alchemyAxios from "@/utils/alchemyAxios";
import { v4 as uuidv4 } from "uuid";
import MainCard from "@/components/block/MainCard";
import TransactionsTable from "@/components/block/TransactionsTable";
import { IBlock } from "@/types/block.interface";
import { EmptyInfoPage } from "@/components/common/EmptyInfoPage";
import { clusterHelperAlc } from "@/utils/cluster.helper";

const Block = ({ block }: { block: IBlock }) => {
  if (block.error || !block.result) {
    return (
      <EmptyInfoPage content="Block you searched does not exist, or a technical problem has occurred. Please check the block number and try again." />
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h6">Block Details</Typography>
      <MainCard block={block} />
      <Typography variant="h6" sx={{ my: 1 }}>
        Transactions
      </Typography>
      <TransactionsTable block={block} />
    </Container>
  );
};

export default Block;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { params, query } = context;
    const blockId = params?.id as string;
    const cluster = query.cluster as string;
    const apiUrl = clusterHelperAlc(cluster);

    const data = {
      method: "getBlock",
      jsonrpc: "2.0",
      params: [
        Number(blockId),
        { encoding: "jsonParsed", maxSupportedTransactionVersion: 0 },
      ],
      id: uuidv4(),
    };

    const response = await alchemyAxios.post(apiUrl, data);

    return {
      props: {
        block: response.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        block: {
          error: true,
        },
      },
    };
  }
};
