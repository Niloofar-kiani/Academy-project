import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import logo from "../img/logo.png"

const Header = () => {
  return (
    <Navbar bg="light" variant="light" sticky="top">
      <Container>
        <Navbar.Brand href="#home">
        <img src={logo} className="logo" alt="logo"/>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/post">
            AddPost
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
