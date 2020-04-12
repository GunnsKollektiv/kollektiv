import React, { Component, Fragment } from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './style.scss';

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            redirectHome: false,
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
                            <NavLink onClick={() => this.setState({ expanded: false })} exact className="nav-link" to="/">Mitt kollektiv</NavLink>

                            {this.props.group && (
                                <>
                                    <NavLink onClick={() => this.setState({ expanded: false })} exact className="nav-link" to="/calendar">Kalender</NavLink>
                                    <NavLink onClick={() => this.setState({ expanded: false })} exact className="nav-link" to="/lists">Lister</NavLink>
                                    <NavLink onClick={() => this.setState({ expanded: false })} exact className="nav-link" to="/game">Spill</NavLink>
                                </>
                            )}
                        </Nav>

                        <Dropdown className="user-dropdown">
                            <Dropdown.Toggle className="user-dropdown-toggle" id="dropdown-basic">
                                {this.props.user.first_name || this.props.user.email} <i className="fas fa-lg fa-user-circle"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => this.props.handleLogout()}>Logg ut</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Fragment>
            )
        }
        return null;
    }

    render() {
        return (
            <div className="header">
                <Navbar fixed="top" variant="dark" expand="lg" expanded={this.state.expanded}>
                    <Navbar.Brand className="brand" onClick={() => this.props.redirect("/")}><h2>Kollektiv</h2></Navbar.Brand>
                    {this.renderNavContent()}
                </Navbar>
            </div>
        )
    }
}
