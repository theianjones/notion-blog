import {Outlet} from 'remix'
import Header from '~/components/Header/Header'

export default function AppContainer() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
