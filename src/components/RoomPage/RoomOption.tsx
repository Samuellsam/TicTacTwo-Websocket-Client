import { Button, Card, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

type Props = {
  title: string
  description: string
  onClick: () => void
}

const RoomOption: React.FC<Props> = (props: Props) => {
  return (
    <Button onClick={props.onClick}>
      <Card>
        <CardContent>
          <Typography variant="h3">
            <b>{props.title}</b>
          </Typography>
          <hr />
          <Typography variant="h6">{props.description}</Typography>
          <br />
        </CardContent>
      </Card>
    </Button>
  )
}

export default RoomOption
