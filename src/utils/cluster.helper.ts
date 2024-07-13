import { ClusterTypes } from "@/types/common.interface";
import { devnetUrlAlc, mainnetUrlAlc } from "./alchemyAxios";
import { devnetUrlHls, mainnetUrlHls } from "./heliusAxios";

export const clusterHelperAlc = (cluster: string): string => {
  return cluster === ClusterTypes.Devnet ? devnetUrlAlc : mainnetUrlAlc;
};

export const clusterHelperHls = (cluster: string): string => {
  return cluster === ClusterTypes.Devnet ? devnetUrlHls : mainnetUrlHls;
};
