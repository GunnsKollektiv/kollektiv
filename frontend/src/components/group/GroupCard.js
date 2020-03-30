import React, { Component } from 'react';
import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import AddMemberModal from './AddMemberModal';
import LeaveGroupModal from './LeaveGroupModal';
import './style.scss';

export default class GroupCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddMember: false,
            showLeaveGroup: false
        }
    }

    toggleShowAddMember = () => this.setState({ showAddMember: !this.state.showAddMember })
    toggleShowLeaveGroup = () => this.setState({ showLeaveGroup: !this.state.showLeaveGroup })

    render() {
        return (

            <Card className="group-card">
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col className="header-col">
                                <h3>{this.props.group.name}</h3>
                            </Col>
                            <Col className="dropdown-col">
                                <Dropdown alignRight>
                                    <Dropdown.Toggle>
                                        <i className="fas fa-cog fa-lg" style={{ color: "black" }}></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={this.toggleShowAddMember}>Legg til medlem</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={this.toggleShowLeaveGroup} style={{ color: "red" }}>Forlat kollektivet</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Card.Title>
                    <hr />
                    <Row>
                        <Col>
                            <ul className="member-list">
                                {this.props.group.members.map((user, key) =>
                                    <li key={key}>
                                        <i className="fas fa-user-circle" /><span> </span>
                                        <a className="a-user" href={"mailto:" + user.email}>
                                            {user.first_name ? `${user.first_name} ${user.last_name}` : user.email}
                                        </a>
                                    </li>
                                )}
                            </ul>
                            <AddMemberModal show={this.state.showAddMember} handleClose={this.toggleShowAddMember} getGroup={this.props.getGroup} />
                            <LeaveGroupModal show={this.state.showLeaveGroup} handleClose={this.toggleShowLeaveGroup} getGroup={this.props.getGroup} group={this.props.group} />
                        </Col>

                    </Row>
                </Card.Body>
            </Card>
        )
    }
}
