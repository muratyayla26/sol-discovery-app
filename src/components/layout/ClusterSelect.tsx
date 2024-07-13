import { useState } from "react";
import { ClusterTypes } from "@/types/common.interface";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/router";

const ClusterSelect = () => {
  const router = useRouter();
  const { cluster } = router.query;
  const [filter, setFilter] = useState(
    cluster === ClusterTypes.Devnet ? ClusterTypes.Devnet : ClusterTypes.Mainnet
  );

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as ClusterTypes);
    const route =
      event.target.value === ClusterTypes.Devnet ? "/?cluster=devnet" : "/";
    router.push(route);
  };

  return (
    <FormControl variant="filled" sx={{ width: 188 }}>
      <InputLabel htmlFor="network-select-item" sx={{ color: "text.primary" }}>
        Network
      </InputLabel>
      <Select
        labelId="network-select"
        id="network-select-item"
        value={filter}
        onChange={handleFilterChange}
        size="small"
      >
        <MenuItem value={ClusterTypes.Mainnet}>Mainnet</MenuItem>
        <MenuItem value={ClusterTypes.Devnet}>Devnet</MenuItem>
      </Select>
    </FormControl>
  );
};
export default ClusterSelect;
