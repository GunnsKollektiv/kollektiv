import React, { Component, Fragment } from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import './style.css'

export default class Header extends Component {

    renderUserInfo = () => {
        if (this.props.user) {
            return (
                <Fragment>
                    <span style={{ padding: "0px 20px" }}>Velkommen, {this.props.user}</span>
                    <Button
                        variant="outline-light"
                        onClick={() => this.props.handleLogout()}
                    >Logg ut</Button>
                </Fragment>
            )
        }
        return null;
    }

    render() {
        return (
            <Navbar variant="dark" expand="lg">
                <Navbar.Brand>Kollektiv</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        
                    </Nav>
                    {this.renderUserInfo()}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
