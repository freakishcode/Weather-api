import { useState } from "react";

// Importing Material-UI components
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";

// Importing search icon for the search button
import SearchIcon from "@mui/icons-material/Search";

// SearchBar component for entering city names
export default function SearchBar({ onSearch, defaultCity = "Lagos, NG" }) {
  const [value, setValue] = useState(defaultCity);

  // Function to handle form submission and trigger the search
  const submit = (e) => {
    e.preventDefault();
    onSearch?.(value.trim());
  };

  return (
    <Box component='form' onSubmit={submit} sx={{ width: "100%" }}>
      {/* TextField for entering the city name with a search icon */}
      <TextField
        fullWidth
        label='Search city (e.g., Lagos, NG)'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton aria-label='search' type='submit'>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
