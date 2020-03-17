import React, { Component } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { post } from '../../api';
import './style.css';
import {
    useHistory,
    useLocation
} from 'react-router-dom';

function withMyHook(Component) {
    return function WrappedComponent(props) {
        let history = useHistory();
        let location = useLocation();
        return <Component {...props} history={history} location={location} />;
    }
}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            register: false,
            message: null
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        post({
            url: 'api/auth/' + (this.state.register ? 'register/' : 'login/'),
            body: {
                email: this.state.email,
                password: this.state.password
            },
            callback: data => this.handleLogin(data),
            errorCallback: error => this.setState({
                message: this.state.register ? "En bruker med denne e-postadressen er allerede registrert" : "Feil e-postadresse og/eller passord"
            })
        })
    }

    handleLogin = data => {
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        this.props.updateUser(data.email, data.token);
        this.props.history.replace(from);
    }

    showMessage = () => {
        if (this.state.message)
            return <Alert variant="danger">{this.state.message}</Alert>
        return null
    }

    render() {

        return (
            <Card className="login-card">
                <Card.Body>
                    <Card.Title>{this.state.register ? "Registrer ny bruker" : "Logg inn"}</Card.Title>
                    <Form onSubmit={this.handleSubmit}>
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
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Passord"
                                required
                                onChange={e => this.setState({ password: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button type="submit" style={{ width: 150 }}>
                                {this.state.register ? "Registrer deg" : "Logg inn"}
                            </Button>
                            <Button
                                variant="link"
                                onClick={() => this.setState({ register: !this.state.register, message: null })}
                            >
                                <small>
                                    {this.state.register ? "Allerede registrert?" : "Registrer deg"}
                                </small>
                            </Button>
                        </Form.Group>
                        <Form.Group>
                            {this.showMessage()}
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

export default Login = withMyHook(Login);
