import React, { Component } from 'react'
import AddGroupCard from './AddGroupCard'
import GroupCard from './GroupCard'

export default class Groups extends Component {

    render() {
        return (
            <div className="group-container">
                {this.props.group ? <GroupCard group={this.props.group} getGroup={this.props.getGroup} /> : <AddGroupCard getGroup={this.props.getGroup} />}
            </div>
        )
    }
}
