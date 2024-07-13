import { IPageErrorData } from "./common.interface";

export enum SearchFilterOptions {
  All = "all",
  Transaction = "transaction",
  Account = "account",
  Block = "block",
}

export interface ISupply extends IPageErrorData {
  result: {
    value: {
      circulating: number;
      nonCirculating: number;
      total: number;
    };
  };
}

export interface IEpoch extends IPageErrorData {
  result: {
    absoluteSlot: number;
    blockHeight: number;
    epoch: number;
    slotIndex: number;
    slotsInEpoch: number;
    transactionCount: number;
  };
}

export interface IPerformanceItem {
  numTransactions: number;
  samplePeriodSecs: number;
}
export interface IPerformance extends IPageErrorData {
  result: IPerformanceItem[];
}
