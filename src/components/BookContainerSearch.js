import React from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


function BookCard({ searchQuery, setSearchQuery }) {

console.log(searchQuery)
  return (
    <>
      <TextField
        id="standard-search"
        label="Search field"
      type="search"
        value={searchQuery}
        onInput={e => setSearchQuery(e.target.value)}
        sx={{ m: 1, width: '25ch' }}
        InputProps={{
          startAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
        }}
      />
    </>
  );
}

export default BookCard;
