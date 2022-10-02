import {
  Navbar as NavbarBS,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <NavbarBS sticky="top"  className=" navbar-dark bg-dark mb-3">
      <Container>
        <Nav>
          <Nav.Link to="/" as={NavLink}>
            Dashboard
          </Nav.Link>

          <NavDropdown title="Order History" id="navbarScrollingDropdown">
            <NavDropdown.Item href="completedorders">
              Completed Orders
            </NavDropdown.Item>
            <NavDropdown.Item href="deletedorders">
              Deleted Orders
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link to="/products" as={NavLink}>
            Products
          </Nav.Link>
        </Nav>
      </Container>
    </NavbarBS>
  );
};

export default Navbar;
