
import React from 'react';
import logo from './logo.svg';

import Component from "@reactions/component";
import Coves_Bold from './coves-typeface/Coves_Bold.otf';
import './BusinessLogin.css'
import 'react-tabs/style/react-tabs.css';
import "react-awesome-button/dist/styles.css";
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Shop from './Shop';


class BusinessLogin extends Component{

onClickHome = () =>{
  this.props.history.push("/")
}
onClickShop = () =>{
  this.props.history.push("/Shop")
}
onClickAbout = () =>{
  this.props.history.push("/About")
}
onClickContact = () =>{
  this.props.history.push("/Contact")
}
onClickCustomerLogin = () =>{
    this.props.history.push("/CustomerLogin")
}
onClickBR2 = () =>{
    this.props.history.push("/BR2")
  }

constructor(props) {
  super(props);
  this.state = {
    fname: '',
    lname: '',
    email: '',
    bname: '',
    description: '',
    Address: '',
    mailSent: false,
    error: null,
    PhoneNumber: '',
  }
}

handleFormSubmit( event ) {
  event.preventDefault();
  console.log(this.state);
}

render(){

  return (
    <div className="BLogin">
      {/* <header className="BLogin-header"> */}
      <div className="titleB">
        <h3 style={{color: "#111111"}}>Business Registration</h3>
      </div>

      {/* </header> */}

      <big><big><h1 style={{color: "#111111"}}>What's your name?</h1></big></big>

      <br></br>
      {/* separator */}
        <div class="separator">
            <svg class="separator__svg" width="100%" height="400" viewBox="0 0 100 100" preserveAspectRatio="none" fill="#44A36F" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M 100 100 V 10 L 0 100"/>
                <path d="M 30 73 L 100 18 V 10 Z" fill="#308355" stroke-width="0"/>
            </svg>
            
        </div>
      {/* end-separator */}

        <label style={{color: "#111111"}}>First Name</label>
        <br></br>
        <input type="text" id="fname" name="firstname" placeholder="Your name…" 
            value={this.state.fname}
            onChange={e => this.setState({ fname: e.target.value })}
            style={{width: 500, height: 50, fontSize: 20, backgroundColor: "#DDDDDD"}}
        />
        <br></br>
        <label style={{color: "#111111"}}>Last Name</label>
        <br></br>
        <input type="text" id="lname" name="lastname" placeholder="Your last name…" 
            value={this.state.lname}
            onChange={e => this.setState({ lname: e.target.value })}
            style={{width: 500, height: 50, fontSize: 20, backgroundColor: "#DDDDDD"}}
        />
        <br></br>
        <button className="btn" onClick= { this.onClickBR2 }><span>Great! Onto the next step!</span></button>
        <button className="btn" onClick={this.onClickHome}><span>Go Back to Home Page</span></button>
    </div>
    

  );
}
}

export default BusinessLogin;
