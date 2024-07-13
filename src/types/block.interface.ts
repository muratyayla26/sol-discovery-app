import { IPageErrorData } from "./common.interface";

export interface IReward {
  lamports: number;
  pubkey: string;
  rewardType: "Fee" | "Rent";
}

export interface IBlockTransaction {
  meta: {
    fee: number;
    err: null | object;
  };
  transaction: {
    signatures: string[];
    message: {
      accountKeys: { pubkey: string; signer: boolean }[];
    };
  };
}

export interface IBlock extends IPageErrorData {
  result: {
    parentSlot: number;
    blockTime: number;
    blockhash: string;
    previousBlockhash: string;
    rewards: IReward[];
    transactions: IBlockTransaction[];
  };
}
