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
    Tabs
} from 'react-bootstrap';
import request from 'superagent';
import { Redirect } from 'react-router';
import Flash from './flash.jsx';

export default class LoginForm extends Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleFieldChange = this.handleFieldChange.bind(this);
      this.loginUser = this.loginUser.bind(this);
      this.state = {
        email: '',
        password: '',
        'token': ''
      }
    }

    handleFieldChange(event) {
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        this.setState({
            [key]: value
        });
    }

    handleSubmit(event) {
      event.preventDefault();
      this.loginUser(this.state.email, this.state.password);

    }

    loginUser (email, password) {
      request
        .post('http://life-plans.herokuapp.com/api/v1/auth/login')
        .type('form')
        .send({'email': email, 'password': password })
        .end((err, result) => {
          if (result.status === 200) {
            this.setState({token: result.body.auth_token})
            localStorage.setItem('token', this.state.token)
            localStorage.setItem('email', email)
            localStorage.setItem('isAuthenticated', true)
            this.context.router.push('dashboard')
          }
          else {
            alert("invalid email/password combination. You may sign up")
            }
          });
      }

    render() {
      return(
        <div id="login">
        <div className="row">
        <div className="col-md-12">
        <div className="well  well-sm">
      <h1>Welcome Back</h1>
      <Form action="post" onSubmit={this.handleSubmit} className="login">
      <FormGroup><Col>Email:</Col>
      <FormControl
        name="email" type="email" required = {true} placeholder="Enter your email" onChange={this.handleFieldChange}
      />
      </FormGroup>
        <FormGroup><Col>Password:</Col>
      <FormControl
        name="password" type="password" required = {true} placeholder="Enter your password" onChange={this.handleFieldChange}
      />
      </FormGroup>
      <FormGroup>
      <Button type="submit" className="btn btn-primary">Log In</Button>

      </FormGroup>
      </Form>
      </div>
      </div>


        </div>
        </div>
      );
    }
}
LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};
