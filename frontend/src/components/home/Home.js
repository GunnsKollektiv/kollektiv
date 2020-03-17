import React, { Component } from 'react'
import { Button, Container } from 'react-bootstrap'

export default class Home extends Component {

    render() {
        return (
            <div>
                <Container>
                    Logget inn som {this.props.user}
                </Container>
                <Container>
                   <Button onClick={() => this.props.handleLogout()}>Logg ut</Button>
                </Container>
            </div>
        )
    }
}
