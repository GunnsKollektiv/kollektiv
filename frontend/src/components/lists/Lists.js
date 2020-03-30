import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { get } from '../../api'
import ListCard from './ListCard'
import './style.scss'


export default class Lists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lists: null,
            activeList: null
        }
    }

    componentDidMount() {
        this.getLists();
    }

    getLists = () => {
        get({
            url: 'api/list/retrieve/',
            callback: this.getListsCallback
        })


    }

    getListsCallback = data => {
        this.setState({ lists: data })
        if (this.state.activeList !== null) {
            const input = document.querySelector("div[reactkey='" + this.state.activeList + "']").querySelector("input.add-item")
            input.focus();
        }
    }

    renderLists = () => {
        if (!this.state.lists)
            return "Ingen lister"

        const lists = this.state.lists.map((list, key) => (
            <Col key={key} reactkey={key} lg>
                <ListCard setActiveList={() => this.setState({ activeList: key })} getLists={this.getLists} list={list} />
            </Col>
        ))

        return (
            <Row>
                {lists}
                {this.state.lists.length % 2 !== 0 && <Col lg></Col>}
            </Row>
        )
    }

    render() {
        return (
            <div className="list-container">
                {this.renderLists()}
            </div>
        )
    }
}
