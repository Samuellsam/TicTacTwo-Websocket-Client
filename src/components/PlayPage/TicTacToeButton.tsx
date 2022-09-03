import { Card, CardContent, Typography } from '@mui/material'

type Props = {
  type: String
  onClick: () => void
}

const TicTacToeButton: React.FC<Props> = (props) => {
  const onButtonClick = () => {
    if (props.type != 'X' && props.type != 'O') {
      props.onClick()
    }
  }

  return (
    <Card
      sx={{
        minWidth: '150px',
        maxWidth: '150px',
      }}
      onClick={onButtonClick}
    >
      <CardContent>
        <Typography variant="h1" align="center">
          {props.type}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default TicTacToeButton
