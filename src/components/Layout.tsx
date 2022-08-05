import { Outlet } from 'react-router-dom'

type Props = {
  children?: React.ReactNode
}

const Layout: React.FC = (props: Props) => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default Layout
