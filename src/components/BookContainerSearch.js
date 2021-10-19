import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
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
 AS       type="search"
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
