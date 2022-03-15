import {Link} from 'remix'
import logo from './logo.png'

function Header() {
  return (
    <header>
      <nav className="flex px-9 max-w-3xl mx-auto flex-row items-center justify-between pt-24 sm:pt-12 md:pt-16 mb-5">
        {/* <Logo /> */}
        <Link to="/">
          <img className="h-12" alt="Ian Jones Logo" src={logo} />
        </Link>
        <div className="flex items-center justify-between">
          <Link
            className="text-lg font-light hover:text-primary ease-in-out text-gray-500 tracking-wider"
            to={'/about-me'}
          >
            About Me
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
