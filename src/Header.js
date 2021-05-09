import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
function Header() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user-info'));
  function logout() {
    localStorage.clear();
    history.push('./register');
  }
  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home'>Navbar</Navbar.Brand>
        <Nav className='mr-auto nav_bar_wrapper'>
          {localStorage.getItem('user-info') ? (
            <>
              <Link to='/'>Product List</Link>
              <Link to='/add'>Add Product</Link>
              <Link to='/update'>Update Product</Link>
              <Link to='/search'>Search Product</Link>
            </>
          ) : (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </>
          )}
        </Nav>
        {localStorage.getItem('user-info') ? (
          <Nav>
            <NavDropdown title={user && user.name}>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item href='https://vast-stream-43266.herokuapp.com/'>
                Help
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : null}
      </Navbar>
    </div>
  );
}
export default Header;
