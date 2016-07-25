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

export default class RegisterForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
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
    this.registerUser(this.state.name, this.state.email, this.state.password, this.state.password_confirmation);
  }

  registerUser(name, email, password, confirmation_password) {
    //alert("You are signing up with username:" + username + ",  email:" + email + " password:" + password + " confirm_password: "+confirm_password)
    request
      .post('http://life-plans.herokuapp.com/api/users/')
      .type('form')
      .send({'name': name, 'email': email, 'password': password, 'password_confirmation': confirmation_password })
      .end((err, result) => {
          if (result.status === 201) {
            console.log("success on registr")
            console.log(result.body.token);
            this.setState({
                  token: result.body.auth_token
            });
            //window.location.reload();
            localStorage.setItem('email', email)
            localStorage.setItem('token', this.state.token)
            localStorage.setItem('isAuthenticated', true);
            this.context.router.push('dashboard');
          } else {
              alert("An error occurred, please use more appropriate names")
          }
      })
      }

  render() {
    return(
      <div id="signup">
      <div className="row">
      <div className="col-md-12">
      <div  className="well  well-sm">
    <h1>Sign Up for Free</h1>
    <Form action="post" onSubmit={this.handleSubmit} className="signup">
    <FormGroup><Col>Name:</Col>
    <FormControl
      type="text" name="name" required = {true} placeholder="Choose a name" onChange={this.handleFieldChange}
    />
    </FormGroup>
    <FormGroup><Col>Email:</Col>
    <FormControl
      type="email" name="email" required = {true} placeholder="Enter your email" onChange={this.handleFieldChange}
    />
    </FormGroup>

    <FormGroup><Col>Password:</Col>
    <FormControl
      type="password" name="password" required = {true} placeholder="Choose a password" onChange={this.handleFieldChange}
    />
    </FormGroup>
    <FormGroup><Col>Confirm Password:</Col>
    <FormControl
      type="password" name="password_confirmation" required = {true} placeholder="Confirm your password" onChange={this.handleFieldChange}
    />
    </FormGroup>
    <FormGroup>
    <Button type="submit" className="btn btn-primary">Get Started </Button>
    </FormGroup>
    </Form>
    </div>
    </div>


      </div>
      </div>


    );
  }
}

RegisterForm.contextTypes = {
    router: React.PropTypes.object.isRequired
};
