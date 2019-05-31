import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './all.css';
import ToDoList from './components/toDoApp'
import List from './components/List'
import Details from './components/Details'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from './config/configKey'


firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: null
    }
  }

  gettingWholeData = () => {
    firebase.database().ref().child("WholeData").on('value', (snap) => {
      if (snap.val()) {
        let data = Object.values(snap.val())
        this.setState({
          data,
        })
      }
    })
  }

  componentWillMount() {
    this.gettingWholeData()
  }

  render() {
    return (
      <div>
        <Router>
          <Route
            exact path="/"
            render={() => <ToDoList
              state={this.state}
            />} />
          <Route
            path="/List"
            render={() => <List
              state={this.state}
            />} />
          <Route
            path="/Details"
            render={() => <Details
              state={this.state}
            />} />
        </Router>
      </div>
    )
  }
}

export default App;
