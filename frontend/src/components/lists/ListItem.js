import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

export default class ListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemName: this.props.item
        }
    }

    handleClick = e => {
        //console.log(e.target.innerHTML)
    }

    itemForm = () => {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Ny gjenstand..."
                    className={"add-item"}
                    onChange={e => this.setState({ itemName: e.target.value })}
                />
                <input
                    type="submit"
                    style={{ display: "none" }}
                />
            </form>
        )
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleSubmit(this.state.itemName)
        this.setState({ item: null })
    }

    render() {
        if (!this.props.item && !this.props.newItemForm)
            return null

        return (
            <li>
                <Row>
                    <Col onClick={this.handleClick}>
                        {this.props.newItemForm ? this.itemForm() : this.props.item.name}
                    </Col>
                    <Col xs={1} style={{ textAlign: "right" }}>
                        {this.props.item && <span onClick={() => { this.props.handleDelete(this.props.item.id) }}><i className="fas fa-times remove-item" /></span>}
                    </Col>
                </Row>
            </li>
        )
    }
}
