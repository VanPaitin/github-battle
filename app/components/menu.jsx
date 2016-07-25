import React, { Component } from 'react';
import {
    Col,
    form,
    Form,
    FormGroup,
    FormControl,
    Control,
    ControlLabel,
    Checkbox,
    Button,
    Tab,
    Tabs,
    SplitButton,
    MenuItem,
    DropdownButton,
    ButtonGroup
} from 'react-bootstrap';

export default class Menu extends Component {
   constructor() {
        super();
    }

    render() {
        return (
            <div className="menu">
            <div className="container">
            <div className="row">
            <div className="col-sm-4 app-name">
              <h2>Life plans</h2>
            </div>
            <div className="col-sm-4 user-menu" style={this.props.menustyle}>
            <h2>
            <a onClick = {this.props.handleLogout}>Logout</a>
            </h2>
            </div>
            </div>

            </div>
            </div>

        );
    }
}
