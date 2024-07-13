import { useRouter } from "next/router";
import { ClusterTypes } from "@/types/common.interface";
import { Typography } from "@mui/material";
import Link from "next/link";

interface IClickableTextProps {
  content: string | number;
  href: string;
}

const ClickableText = ({ content, href }: IClickableTextProps) => {
  const router = useRouter();
  const { cluster } = router.query;
  const redirectUrl =
    cluster === ClusterTypes.Devnet ? `${href}?cluster=devnet` : href;

  return (
    <Link href={redirectUrl} passHref>
      <Typography variant="body2" className="clickableText">
        {content}
      </Typography>
    </Link>
  );
};

export default ClickableText;
