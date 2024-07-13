import axios from "axios";

export const mainnetUrlAlc = `https://solana-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_SOLANA_KEY}`;
export const devnetUrlAlc = `https://solana-devnet.g.alchemy.com/v2/${process.env.ALCHEMY_SOLANA_KEY}`;

const alchemyAxios = axios.create({});

export default alchemyAxios;
