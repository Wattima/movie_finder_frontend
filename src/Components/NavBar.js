import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function NavBar() {

  return (
    <Box sx={{
     backgroundColor: 'primary',
    //  fontSize: '10rem',
      color: 'white',
      padding: 3,
      marginTop: 3,
      display: 'flex',
      justifyContent: 'space-evenly',
    }}>
      <Button
        href='/'
      > Home </Button>
      <Button
        href="/users/new"
      > Login/New User </Button>
      <Button
        href="/tasks"
      > Movies </Button>
      <Button
        href="/users"
      > Users </Button>
      <Button
        href="/tasks/new"
      > New Movie </Button>

    </Box>
  )
}

export default NavBar
