import { Button } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useState } from "react";

const About = () => {
  const [counter, setCounter] = useState(1);
  const { wallet, publicKey } = useWallet();
  console.log("wallet", wallet, publicKey);

  return (
    <div>
      <Button onClick={() => setCounter((prev) => prev + 1)}>counter</Button>
      <WalletMultiButton />
      <WalletDisconnectButton />
    </div>
  );
};
export default About;
