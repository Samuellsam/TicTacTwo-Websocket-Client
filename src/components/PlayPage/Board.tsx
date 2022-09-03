import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { Coordinate } from '../../models/Coordinate'
import TicTacToeButton from './TicTacToeButton'

type Props = {
  coordinates: Coordinate[]
  disable: boolean
  onSelectedCell: (x: number, y: number) => void
}

const Board: React.FC<Props> = (props: Props) => {
  const getTypeFromCoordinates = (x: number, y: number) => {
    let coordinate: Coordinate | undefined = props.coordinates.find(
      (coordinate) => coordinate.x == x && coordinate.y == y
    )

    if (coordinate && coordinate.type) return coordinate.type

    return '='
  }

  const onButtonClick = (x: number, y: number) => {
    if (!props.disable) {
      props.onSelectedCell(x, y)
    }
  }

  const renderBoard = () => {
    const rows = []
    for (let i = 0; i < 3; i++) {
      const cols = []
      for (let j = 0; j < 3; j++) {
        cols.push(
          <Grid item xs={4} key={`${i}${j}`}>
            <TicTacToeButton
              type={getTypeFromCoordinates(i, j)}
              onClick={() => onButtonClick(i, j)}
            />
          </Grid>
        )
      }
      rows.push(cols)
    }

    return (
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent={'center'}
        sx={{
          width: '500px',
        }}
      >
        {rows}
      </Grid>
    )
  }

  return (
    <Box
      p={3}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {renderBoard()}
    </Box>
  )
}

export default Board
