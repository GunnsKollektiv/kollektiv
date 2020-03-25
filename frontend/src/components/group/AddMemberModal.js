import React, { Component } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { post } from '../../api';

export default class AddMemberModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            message: null,
            errorMessage: false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        post({
            url: 'api/group/add-member/',
            body: {
                email: this.state.email
            },
            callback: data => {
                this.setState({ message: this.state.email + " ble lagt til!", errorMessage: false })
                this.props.getGroup()
            },
            errorCallback: error => {
                console.log(error)
                let message;
                if (error.details.includes("already in a group"))
                    message = this.state.email + " er allerede medlem av et kollektiv"
                else if (error.details.includes("email"))
                    message = this.state.email + " er ikke en registrert bruker"
                this.setState({ message: message, errorMessage: true })
            }
        });
    }

    showMessage = () => {
        if (this.state.message)
            return <Alert variant={this.state.errorMessage ? "danger" : "success"}>{this.state.message}</Alert>
        return null
    }

    handleClose = () => {
        this.setState({ message: null, errorMessage: false })
        this.props.handleClose();
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Legg til medlem</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="E-postadresse"
                                required
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            {this.showMessage()}
                        </Form.Group>
                        <Form.Group style={{ float: "right" }}>
                            <Button type="submit">
                                Legg til
                        </Button>
                            <Button variant="secondary" onClick={this.handleClose} style={{ marginLeft: 10 }}>
                                Ferdig
                        </Button>
                        </Form.Group>
                    </Modal.Body>
                </Form>
            </Modal>
        )
    }
}
