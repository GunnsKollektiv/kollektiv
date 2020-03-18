import React, { Component, Fragment } from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import './style.css'

export default class Header extends Component {

    renderNavContent = () => {
        if (this.props.user) {
            return (
                <Fragment>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            {/* Links here */}
                        </Nav>
                        <span style={{ padding: "0px 20px" }}>
                            Velkommen, {this.props.user.first_name || this.props.user.email}
                        </span>
                        <Button
                            variant="outline-light"
                            onClick={() => this.props.handleLogout()}
                        >Logg ut</Button>
                    </Navbar.Collapse>
                </Fragment>
            )
        }
        return null;
    }

    render() {
        return (
            <div className="header">
                <Navbar variant="dark" expand="lg">
                    <Navbar.Brand><h2>Kollektiv</h2></Navbar.Brand>
                    {this.renderNavContent()}
                </Navbar>
            </div>
        )
    }
}
