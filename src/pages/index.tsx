import { EmptyInfoPage } from "@/components/common/EmptyInfoPage";
import TopCards from "@/components/dashboard/TopCards";
import TPSChart from "@/components/dashboard/TPSChart";
import { IPageErrorData } from "@/types/common.interface";
import { IEpoch, IPerformance, ISupply } from "@/types/dashboard.interface";
import alchemyAxios from "@/utils/alchemyAxios";
import { clusterHelperAlc } from "@/utils/cluster.helper";
import { Container } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { v4 as uuidv4 } from "uuid";

interface IDashboardProps extends IPageErrorData {
  supply: ISupply;
  epoch: IEpoch;
  performance: IPerformance;
}

export default function Dashboard({ data }: { data: IDashboardProps }) {
  if (
    data.error ||
    !data.supply.result ||
    !data.epoch.result ||
    !data.performance.result
  ) {
    return (
      <EmptyInfoPage content="Unexpected error has occured. Please try again later." />
    );
  }

  const { supply, epoch, performance } = data;

  const reversedPerformance = performance.result.reverse();

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <TopCards supply={supply} epoch={epoch} />
      <TPSChart performance={reversedPerformance} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { query } = context;
    const cluster = query.cluster as string;
    const apiUrl = clusterHelperAlc(cluster);

    const supplyPayload = {
      method: "getSupply",
      jsonrpc: "2.0",
      id: uuidv4(),
    };
    const supplyRequest = await alchemyAxios.post(apiUrl, supplyPayload);

    const epochPayload = {
      method: "getEpochInfo",
      jsonrpc: "2.0",
      id: uuidv4(),
    };
    const epochRequest = await alchemyAxios.post(apiUrl, epochPayload);

    const performancePayload = {
      method: "getRecentPerformanceSamples",
      jsonrpc: "2.0",
      params: [30],
      id: uuidv4(),
    };
    const performanceRequest = await alchemyAxios.post(
      apiUrl,
      performancePayload
    );

    const [
      { data: supplyResponse },
      { data: epochResponse },
      { data: performanceResponse },
    ] = await Promise.all([supplyRequest, epochRequest, performanceRequest]);

    return {
      props: {
        data: {
          supply: supplyResponse,
          epoch: epochResponse,
          performance: performanceResponse,
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

