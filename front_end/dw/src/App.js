import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <Container fluid>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand style={{color:"white"}} href="#">Datawarehouse</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row style={{ marginTop: "100px", display:"flex", justifyContent:"space-between", }}>
        <Col xl={4}>
          {" "}
          <Form.Select aria-label="Default select example">
            <option>Select team 1</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
        <Col xl={4}>
          {" "}
          <Form.Select aria-label="Default select example">
            <option>Select team 2</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Col>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Col>
          {" "}
          <Table bordered>
            <tbody>
              <tr>
                <td>Name team</td>
              </tr>
              <tr>
                <td>Venue</td>
              </tr>
              <tr>
                <td>Home win rate</td>
              </tr>
              <tr>
                <td>Away win rate</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <Table  bordered hover>
            <tbody>
              <tr>
                <td>Name team</td>
              </tr>
              <tr>
                <td>Venue</td>
              </tr>
              <tr>
                <td>Home win rate</td>
              </tr>
              <tr>
                <td>Away win rate</td>
              </tr>
              <tr>
                <td>Goal scoreds</td>
              </tr>
              <tr>
                <td>Number of win</td>
              </tr>
              <tr>
                <td>Number of lose</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <Table bordered>
            <tbody>
              <tr>
                <td>Team 2</td>
              </tr>
              <tr>
                <td>Venue</td>
              </tr>
              <tr>
                <td>Home win rate</td>
              </tr>
              <tr>
                <td>Away win rate</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
