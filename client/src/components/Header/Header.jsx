import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import classes from "./header.module.css";
import EvangadiLogo from "../../Assets/Images/evangadi-logo-header.png";
import { UserState } from "../../App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  const { user, setUser } = useContext(UserState); // Added setUser to clear state
  const navigate = useNavigate();
  const userId = user?.userid;

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null); // Clear the global user state immediately
    navigate("/auth"); // Smooth navigation without reload
  };

  return (
    <Navbar
      expand="md"
      className={`${classes.header_outer} sticky-top bg-white`}
    >
      <Container className={classes.header_container}>
        {/* Changed href to Link for SPA navigation */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={EvangadiLogo}
            className="d-inline-block align-top"
            alt="Evangadi Logo"
            width="200"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {userId && (
              <Nav.Link as={Link} to="/" className={classes.navigation_links}>
                Home
              </Nav.Link>
            )}

            <Nav.Link
              as={Link}
              to="/howitworks"
              className={classes.navigation_links}
            >
              How it Works
            </Nav.Link>

            <div className={classes.btn_wrapper}>
              {userId ? (
                <Button onClick={handleSignOut} className={classes.logout_btn}>
                  LOGOUT
                </Button>
              ) : (
                <Button as={Link} to="/auth" className={classes.login_btn}>
                  SIGN IN
                </Button>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
