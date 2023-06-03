import React from 'react';
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';

import Modal from '../Modal/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponent = () => {
    return (
        <Navbar bg="dark" variant="dark">

            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="sections">Section</Nav.Link>
                <Nav.Link href="all posts">All Posts</Nav.Link>
                <Modal />
            </Nav>


            <Form inline>
                {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button> */}
                {/* <Button variant="outline-info">Sidebar</Button> */}
            </Form>

        </Navbar>

    );
}

export default NavbarComponent;