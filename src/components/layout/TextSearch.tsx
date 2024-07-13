import { useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchFilterOptions } from "@/types/dashboard.interface";
import { ClusterTypes } from "@/types/common.interface";

const TextSearch = () => {
  const router = useRouter();
  const { cluster } = router.query;
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState(SearchFilterOptions.All);

  const handleSearch = () => {
    const trimmedValue = searchValue.trim();
    if (!trimmedValue) return;

    let route = "";
    if (filter === SearchFilterOptions.All) {
      const inputLength = trimmedValue.length;
      if (inputLength > 75) {
        route = `/transaction/${trimmedValue}`;
      } else if (inputLength >= 30 && inputLength <= 75) {
        route = `/account/${trimmedValue}`;
      } else if (inputLength < 30) {
        route = `/block/${trimmedValue}`;
      }
    } else {
      route = `/${filter}/${trimmedValue}`;
    }
    route = cluster === ClusterTypes.Devnet ? `${route}?cluster=devnet` : route;

    router.push(route);
    setSearchValue("");
    inputRef.current?.blur();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as SearchFilterOptions);
  };

  return (
    <Stack
      className="searchBarContainer"
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      width="100%"
      sx={{ mx: 3 }}
    >
      <FormControl variant="filled" sx={{ width: 188 }}>
        <InputLabel htmlFor="filter-select-item" sx={{ color: "text.primary" }}>
          Filters
        </InputLabel>
        <Select
          labelId="filter-select"
          id="filter-select-item"
          value={filter}
          onChange={handleFilterChange}
          defaultValue={SearchFilterOptions.All}
          className="filterDropdown"
        >
          <MenuItem value={SearchFilterOptions.All}>All Filters</MenuItem>
          <MenuItem value={SearchFilterOptions.Account}>Address</MenuItem>
          <MenuItem value={SearchFilterOptions.Block}>Block</MenuItem>
          <MenuItem value={SearchFilterOptions.Transaction}>
            Transaction Hash
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="search-box" sx={{ color: "text.primary" }}>
          Search for blocks, accounts, transactions
        </InputLabel>
        <FilledInput
          inputRef={inputRef}
          value={searchValue}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
          id="search-box"
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          className="searchInput"
        />
      </FormControl>
    </Stack>
  );
};
export default TextSearch;
