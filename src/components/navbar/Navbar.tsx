import styles from "./navbar.module.scss";

import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { set } from "../../store/search/searchSlice";



export default function Navbar() {

  const [searchText, setSearchText] = React.useState('pokemon')

  const dispatch = useDispatch()


  const handleSearch = () => {
    dispatch(set(searchText))
  }

  return (
    <AppBar className={styles.__} position="static">
      <Toolbar>
        <MovieCreationIcon className={styles.__icon} />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          MovieDB
        </Typography>

        <Box className={styles.__input__container}>
          <FormControl variant="outlined">

            <OutlinedInput
              value={searchText}
              onChange={(e) => { setSearchText(e.target.value) }}
              onKeyDown={(e) => { e.key === 'Enter' && handleSearch() }}
              id="filled-adornment-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleSearch}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box>
          <Link to="/">Home</Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}