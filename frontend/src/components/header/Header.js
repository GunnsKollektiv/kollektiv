import React, { Component, Fragment } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './style.css';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({ expanded: false })
        }
    }

    renderNavContent = () => {
        if (this.props.user) {
            return (
                <Fragment>
                    <Navbar.Toggle onClick={() => this.setState({ expanded: this.state.expanded ? false : "expanded" })} />
                    <Navbar.Collapse>
                        <Nav className="mr-auto" onSelect={this.closeNav}>
                            <NavLink onClick={() => setTimeout(() => this.setState({ expanded: false}), 150)} exact className="nav-link" to="/">Hjem</NavLink>
                            <NavLink onClick={() => this.setState({ expanded: false})} exact className="nav-link" to="/lists">Lister</NavLink>
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
                <Navbar variant="dark" expand="lg" expanded={this.state.expanded}>
                    <Navbar.Brand><h2>Kollektiv</h2></Navbar.Brand>
                    {this.renderNavContent()}
                </Navbar>
            </div>
        )
    }
}
