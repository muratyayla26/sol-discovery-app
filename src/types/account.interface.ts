import { IPageErrorData } from "./common.interface";

export interface IAccountInfo extends IPageErrorData {
  result: {
    value: {
      executable: boolean;
      lamports: number;
      owner: string;
    };
  };
}

export interface IAccountData {
  blockTime: number;
  err: object | null;
  signature: string;
  slot: number;
}

export interface IAccountTransactions extends IPageErrorData {
  result: IAccountData[];
}

export interface ITokenData {
  id: string;
  interface: string;
  token_info: {
    balance: number;
    associated_token_address: string;
  };
}

export interface IAccountTokens extends IPageErrorData {
  result: {
    items: ITokenData[];
  };
}

export interface ITokenSeparationAcc {
  fungibleTokens: ITokenData[];
  nfts: ITokenData[];
}

export interface IAccountPageFetch {
  [Key: string]: IAccountInfo | IAccountTransactions | IAccountTokens;
}
