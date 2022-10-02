import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import { useAppContext } from "../context/AppContext";
import { BiSearchAlt2 } from "react-icons/Bi";

const SearchField = () => {
  const { products, setProducts } = useAppContext();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };
  return (
    <Col lg="4" className="mt-2">
      <Form>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search"
          />
          <Button>
            <BiSearchAlt2 />
          </Button>
        </InputGroup>
      </Form>
    </Col>
  );
};

export default SearchField;
