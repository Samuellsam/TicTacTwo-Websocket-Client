import { Box } from '@mui/system'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const CenteredLayout: React.FC<Props> = (props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      {props.children}
    </Box>
  )
}

export default CenteredLayout
