import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LoaderDiv from './loaderDiv'
import Edit from './Edit'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            editDiv: false,
        }
    }

    componentWillMount() {
        this.setState({
            name: this.props.location.state.name
        })
    }

    delete = () => {
        firebase.database().ref().child("WholeData").child(this.state.name).remove()
        this.props.history.push("/List")
    }

    edit = () => {
        this.setState({
            editDiv: true
        })
    }

    render() {
        // console.log(this.state.name)
        return (
            this.props.state.data ?
                <div className="mainContainer">
                    {this.state.editDiv ?
                        <Edit state={this.state} props={this.props} />
                        : null}
                    <div className="header">
                        <p>{this.state.name.toUpperCase()} Details</p>
                    </div>
                    <div className="detaiDiv">
                        <table>

                            {this.props.state.data.map((detail, index) => {
                                return (
                                    detail.name === this.state.name ?
                                        <tbody key={index}>
                                            <tr>
                                                <th>Name:</th>
                                                <td>{detail.name}</td>
                                            </tr>
                                            <tr>
                                                <th>Class:</th>
                                                <td>{detail.class}</td>
                                            </tr>
                                            <tr>
                                                <th>RollNo:</th>
                                                <td>{detail.rollNo}</td>
                                            </tr>
                                            <tr>
                                                <th>Age:</th>
                                                <td>{detail.age}</td>
                                            </tr>
                                            <tr>
                                                <th>Email:</th>
                                                <td>{detail.email}</td>
                                            </tr>
                                        </tbody> :
                                        null
                                )

                            })}
                        </table>
                        <p>
                            <button onClick={this.edit}>Edit</button>
                            <button onClick={this.delete}>Delete</button>
                        </p>
                    </div>
                </div>
                : <LoaderDiv />
        )
    }
}

export default withRouter(Details);