import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LoaderDiv from './loaderDiv'
class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ""
        }
    }

    pushToDetails = (ev) => {
        this.props.history.push({
            pathname: '/Details',
            state: { name: ev.target.name }
        })
    }

    render() {
        // console.log(this.props)
        return (
            this.props.state.data ?
                <div className="mainContainer">
                    <div className="header">
                        <p>List</p>
                    </div>
                    <div className="listDiv">
                        {this.props.state.data.map((name, index) => {
                            return (
                                <p key={index}>
                                    <span>{name.name}</span>
                                    <button
                                        name={name.name} onClick={(ev) => this.pushToDetails(ev)}
                                    >
                                        View Details
                                    </button>
                                </p>
                            )
                        })}
                    </div>
                </div> :
                <LoaderDiv />
        )
    }
}

export default withRouter(List)