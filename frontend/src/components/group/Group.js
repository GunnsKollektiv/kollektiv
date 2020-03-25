import React, { Component } from 'react';
import { Card, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import AddMemberModal from './AddMemberModal';
import './style.scss';
import LeaveGroupModal from './LeaveGroupModal';

export default class Group extends Component {

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
        if (!this.props.group)
            return "Du er ikke i et kollektiv"

        return (
            <div className="group-container">
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col className="header-col">
                                    <h2>{this.props.group.name}</h2>
                                </Col>
                                <Col className="dropdown-col">
                                    <DropdownButton alignRight variant="secondary" title="">
                                        <Dropdown.Item onClick={this.toggleShowAddMember}>Legg til medlem</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={this.toggleShowLeaveGroup} style={{ color: "red" }}>Forlat kollektivet</Dropdown.Item>
                                    </DropdownButton>
                                </Col>
                            </Row>
                        </Card.Title>
                        <hr />
                        <ul className="member-list">
                            {this.props.group.members.map((user, key) =>
                                <li key={key}>
                                    <a className="a-user" href={"mailto:" + user.email}>
                                        {user.first_name ? `${user.first_name} ${user.last_name}` : user.email}</a>
                                </li>
                            )}
                        </ul>
                        <AddMemberModal show={this.state.showAddMember} handleClose={this.toggleShowAddMember} getGroup={this.props.getGroup} />
                        <LeaveGroupModal show={this.state.showLeaveGroup} handleClose={this.toggleShowLeaveGroup} getGroup={this.props.getGroup} group={this.props.group} />
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
