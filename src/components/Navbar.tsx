'use client';

import { useSession } from 'next-auth/react'; // v5 compatible
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  if (status === 'loading') return null;
  const currentUser = session?.user?.email;
  const role = session?.user?.role;
  return (
    <div>
      {/* Top green strip */}
  <div className="top-strip"></div>
    <Navbar className="nav-main d-flex justify-content-between align-items-center px-4 py-2">
      <Container>
        <Navbar.Brand href="/"><img src="/logo.png" width="200px" alt="Bow-lletins" /></Navbar.Brand>

    {/* CENTER: Navigation Links */}
    <Nav className="nav-center d-none d-md-flex">
      <Nav.Link className="nav-link-custom">Home</Nav.Link>
      <NavDropdown title="Categories" className="nav-link-custom">
  <NavDropdown.Item>Jobs</NavDropdown.Item>
  <NavDropdown.Item>Internships</NavDropdown.Item>
  <NavDropdown.Item>Events</NavDropdown.Item>
  <NavDropdown.Item>Study Groups</NavDropdown.Item>
  <NavDropdown.Item>Social</NavDropdown.Item>
  <NavDropdown.Item>Clubs</NavDropdown.Item>
</NavDropdown>
      <Nav.Link className="nav-link-custom">About</Nav.Link>
      <Nav.Link className="nav-link-custom">Contact</Nav.Link>
    </Nav>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser && (
              <>
                <Nav.Link id="add-stuff-nav" href="/add" active={pathName === '/add'}>
                  Add Stuff
                </Nav.Link>
                <Nav.Link id="list-stuff-nav" href="/list" active={pathName === '/list'}>
                  List Stuff
                </Nav.Link>
              </>
            )}
            {currentUser && role === 'ADMIN' && (
              <Nav.Link id="admin-stuff-nav" href="/admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
    <div>
      <button className="btn btn-sm text-uh-green me-2">Login</button>
      <button className="btn btn-sm btn-outline-success">Sign Up</button>
    </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar></div>
  );
};

export default NavBar;
