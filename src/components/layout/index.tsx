import { AppBar, Container, Stack, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import TextSearch from "./TextSearch";
import ClusterSelect from "./ClusterSelect";
import { useRouter } from "next/router";
import { ClusterTypes } from "@/types/common.interface";

const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { cluster } = router.query;
  const logoUrl = cluster === ClusterTypes.Devnet ? "/?cluster=devnet" : "/";

  return (
    <>
      <AppBar position="static" className="headerContainer">
        <Container maxWidth="lg" sx={{ height: 85 }}>
          <Toolbar disableGutters sx={{ height: "100%" }}>
            <Link href={logoUrl} passHref>
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="flex-start"
                gap={0.5}
              >
                <Stack
                  sx={{
                    bgcolor: "background.default",
                    p: 0.6,
                    borderRadius: 1,
                    width: 40,
                    height: 40,
                  }}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Image
                    src="/assets/sol-logo-transparent.svg"
                    width={26}
                    height={20}
                    alt="solana logo"
                  />
                </Stack>
                <Stack alignItems="flex-start">
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    fontWeight="fontWeightBold"
                    lineHeight={1}
                  >
                    SOL
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    fontWeight="fontWeightBold"
                    lineHeight={1}
                  >
                    DISCOVERY
                  </Typography>
                </Stack>
              </Stack>
            </Link>
            <TextSearch />
            <ClusterSelect />
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </>
  );
};
export default Layout;
