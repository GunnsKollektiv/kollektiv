import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { post } from '../../api'
import ListItem from './ListItem'

export default class ListCard extends Component {

    items = () => {
        const items = this.props.list.items.map((item, key) =>
            <ListItem
                key={key}
                item={item}
                handleSubmit={this.handleSubmit}
                handleDelete={this.handleDelete}
            />
        )
        items.push(<ListItem key={items.length + 1} handleSubmit={this.handleSubmit} newItemForm />)
        return items;
    }

    handleSubmit = itemName => {
        post({
            url: 'api/list/add-item/',
            body: {
                list_id: this.props.list.id,
                name: itemName
            },
            callback: data => this.props.getLists()
        })
        this.props.setActiveList()
    }

    handleDelete = itemId => {
        post({
            url: 'api/list/delete-item/',
            body: {
                item_id: itemId
            },
            callback: data => this.props.getLists()
        })
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>
                        {this.props.list.name}
                    </Card.Title>
                    <ul>
                        {this.items()}
                    </ul>
                </Card.Body>
            </Card>
        )
    }
}
