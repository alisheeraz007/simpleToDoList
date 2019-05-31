import React, { Component } from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.state.name,
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

    update=(ev)=>{
        ev.preventDefault()
        firebase.database().ref().child("WholeData").child(this.props.state.name).remove()
        let obj = {
            name:this.state.name,
            class:this.state.class,
            rollNo:this.state.rollNo,
            age:this.state.age,
            email:this.state.email,
        }
        firebase.database().ref().child("WholeData").child(obj.name).set(obj)
        this.props.props.history.push("/List")
    }

    render() {
        // console.log(this.props.props)
        return (
            <div className="adminPasscodeInputDiv">
                <div className="header">
                    <p>Edits {this.props.state.name.toUpperCase()}'s Data</p>
                </div>
                <div className="inputDiv">
                    <form onSubmit={(ev) => this.update(ev)}>
                        <input
                            className="small"
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={(ev) => this.gettingValue(ev)}
                            value={this.state.name}
                            autoFocus
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
                        <button>Update</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Edit;