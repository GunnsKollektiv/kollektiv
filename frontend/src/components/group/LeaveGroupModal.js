import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { post } from '../../api';


export default class LeaveGroupModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleSubmit = e => {
        e.preventDefault();
        post({
            url: 'api/group/leave/',
            callback: data => {
                this.props.getGroup();
            },
            errorCallback: error => {

            }
        });
    }

    handleClose = () => {
        this.props.handleClose();
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Forlat kollektivet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Er du sikker på at du vil forlate {this.props.group.name}?</p>
                        {this.props.group.members.length === 1 ? <p style={{ color: "red" }}>Dette vil også slette kollektivet, inkludert all data som hører til!</p> : <p>Et annet medlem må invitere deg hvis ønsker å bli medlem igjen.</p>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="danger">
                            Forlat
                            </Button>
                        <Button variant="secondary" onClick={this.handleClose} style={{ marginLeft: 10 }}>
                            Avbryt
                            </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}
