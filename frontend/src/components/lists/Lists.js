import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import ListCard from './ListCard'
import './style.scss'

export default class Lists extends Component {

    getLists = () => {
        return (
            <>
                <Row>
                    <Col xs>
                        <ListCard />
                    </Col>
                    <Col xs>
                        <ListCard />
                    </Col>
                </Row>
                <Row>
                    <Col xs>
                        <ListCard />
                    </Col>
                    <Col xs>
                        <ListCard />
                    </Col>
                </Row>
            </>
        )
    }

    render() {
        return (
            <div className="list-container">
                {this.getLists()}
            </div>
        )
    }
}
