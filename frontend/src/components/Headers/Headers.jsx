import {Nav} from "react-bootstrap"
import Container from "react-bootstrap/Container"
import { Navbar } from "react-bootstrap"
import {NavLink} from "react-router-dom"

const Headers = () => {
  return (
    <>
       <Navbar bg="dark" variant="dark" style={{ height: "50px" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-2">Navbar</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light ">Home</NavLink>
          </Nav>
        </Container>
      </Navbar>
    
    </>
  )
}

export default Headers
