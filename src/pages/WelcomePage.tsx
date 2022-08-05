import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const WelcomePage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container>
        <Typography variant="h1" align="center">
          <b>TIC TAC TWOS!</b>
        </Typography>
        <Typography variant="h6" align="center">
          A "REAL TIME" two player tic tac toe game!
        </Typography>
        <Box m={2} display="flex" justifyContent="center" alignItems="center">
          <Button component={Link} to="play" variant="outlined" size="large">
            Play Now
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default WelcomePage
