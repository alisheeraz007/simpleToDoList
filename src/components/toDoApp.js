import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { changePath } from '../common/index'

class ToDoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            class: "",
            rollNo: "",
            age: "",
            email: "",
        }
    }

    gettingValue = (ev) => {
        // console.log(ev.target.value)
        this.setState({
            [ev.target.name]: ev.target.value,
        }, () => {
            // console.log(this.state)
        })
    }

    saveData = (ev) => {
        ev.preventDefault()
        // console.log(firebase.database())
        // let firebaseRef = firebase.database().ref();
        let obj1 = {
            name: this.state.name,
            class: this.state.class,
            age: this.state.age,
            rollNo: this.state.rollNo,
            email: this.state.email,
        }
        firebase.database().ref().child("WholeData").child(obj1.name).set(obj1)

        setTimeout(() => {
            this.setState({
                name: "",
                class: "",
                rollNo: "",
                age: "",
                email: "",
            })
        },1000)
    }

    render() {
        // console.log(this.props)
        return (
            <div className="mainContainer">
                <div className="header">
                    <p>My ToDo App</p>
                </div>
                <div className="inputDiv">
                    <form onSubmit={(ev) => this.saveData(ev)}>

                        <input
                            className="small"
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={(ev) => this.gettingValue(ev)}
                            value={this.state.name}
                            required
                        />
                        <input
                            className="small"
                            type="number"
                            name="class"
                            placeholder="Class"
                            onChange={(ev) => this.gettingValue(ev)}
                            value={this.state.class}
                            required
                        />
                        <input
                            className="small"
                            type="number"
                            name="age"
                            placeholder="Age"
                            onChange={(ev) => this.gettingValue(ev)}
                            value={this.state.age}
                            required
                        />
                        <input
                            className="small"
                            type="text"
                            name="rollNo"
                            placeholder="Roll No"
                            onChange={(ev) => this.gettingValue(ev)}
                            value={this.state.rollNo}
                            required
                        />
                        <input
                            className="large"
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={(ev) => this.gettingValue(ev)}
                            value={this.state.email}                        
                            required
                        />
                        <button>Send Details</button>
                    </form>
                    {this.props.state.data ?
                        <button
                            onClick={(ev) => changePath(ev.target.name, this.props)}
                            name="List">View List</button>
                        : null}
                </div>
            </div>
        )
    }
}

export default withRouter(ToDoList);