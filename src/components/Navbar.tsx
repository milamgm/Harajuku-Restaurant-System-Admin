import { Navbar as NavbarBS, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <NavbarBS sticky="top" className=" navbar-dark bg-dark mb-3">
      <Container className="top-nav">
        <Nav>
          <Nav.Link to="/" as={NavLink}>
            Dashboard
          </Nav.Link>

          <Nav.Link to="/completedorders" as={NavLink}>
            Completed Orders
          </Nav.Link>
          <Nav.Link to="/deletedorders" as={NavLink}>
            Deleted Orders
          </Nav.Link>

          <Nav.Link to="/products" as={NavLink}>
            Products
          </Nav.Link>
        </Nav>
      </Container>
    </NavbarBS>
  );
};

export default Navbar;
