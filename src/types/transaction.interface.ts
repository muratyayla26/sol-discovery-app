import { IPageErrorData } from "./common.interface";

export interface ITransaction extends IPageErrorData {
  result: {
    blockTime: number;
    meta: {
      err: null | object;
      fee: number;
      postBalances: number[];
      preBalances: number[];
    };
    slot: number;
    transaction: {
      message: {
        accountKeys: string[];
        recentBlockhash: string;
      };
      signatures: string[];
    };
  };
}
