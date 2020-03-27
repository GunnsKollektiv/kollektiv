import React, { Component } from 'react';
import { Alert, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { post } from '../../api';

export default class AddGroupCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupName: null,
            alert: false
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        post({
            url: 'api/group/create/',
            body: {
                name: this.state.groupName
            },
            callback: data => this.props.getGroup(),
            errorCallback: this.handleErrorCallback
        })
    }

    handleErrorCallback = error => {
        if (error.details.includes("already exists"))
            this.setState({ alert: true })
        else
            console.log(error)
    }

    showAlert = () => this.state.alert && <Alert variant="danger" >Et kollektiv med dette navnet eksisterer allerede</Alert>

    render() {
        return (
            <Card className="add-group-card">
                <Card.Body>
                    <Card.Title>
                        <h3>Bli med i et kollektiv!</h3>
                    </Card.Title>
                    <hr />
                    <p>
                        Bli med i et kollektiv for å få tilgang til lister, spill og mer.
                    </p>
                    <p>
                        For å bli med i et kollektiv kan du enten opprette et nytt og invitere medlemmer, eller så kan du be en annen i kollektivet invitere deg.
                    </p>
                    <hr />
                    <p>Opprett et nytt kollektiv:</p>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Navn på kollektivet"
                                    required
                                    onChange={e => this.setState({ groupName: e.target.value })}
                                />
                                <InputGroup.Append>
                                    <Button type="submit">
                                        Opprett
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    {this.showAlert()}
                </Card.Body>
            </Card>
        )
    }
}
