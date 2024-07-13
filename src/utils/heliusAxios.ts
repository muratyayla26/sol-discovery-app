import axios from "axios";

export const mainnetUrlHls = `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_SOLANA_KEY}`;
export const devnetUrlHls = `https://devnet.helius-rpc.com/?api-key=${process.env.HELIUS_SOLANA_KEY}`;

const heliusAxios = axios.create({});

export default heliusAxios;
