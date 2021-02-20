import React, { Component } from "react";
import "./App.css";
import HkStudentList from "./components/HkStudentList";

class App extends Component {
    render() {
        return <div className='App'>
            <HkStudentList/>
        </div>;
    }
}

export default App;
