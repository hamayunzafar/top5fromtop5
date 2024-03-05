import logo from './../resources/top5fromtop5.svg'

export const Navbar = () => {
    return (
      <nav className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span>Top5FromTop5</span>
      </nav>
    );
  };