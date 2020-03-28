
import React from 'react';
import logo from './logo.svg';
import './Home.css';
import Component from "@reactions/component";
import Coves_Bold from './coves-typeface/Coves_Bold.otf';
import './BR2.css'
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


class BR2 extends Component{

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
onClickBusinessLogin = () =>{
    this.props.history.push("/BusinessLogin")
}
onClickBR3 = () =>{
    this.props.history.push("/BR3")
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
    <div className="B2Login">
      {/* <header className="BLogin-header"> */}
      
      {/* </header> */}
      <div>
        <h3 style={{color: "#111111"}}>Business Registration</h3>
      </div>
      <br></br><br></br><br></br>
      <big><big><h1 className="mtitle" style={{color: "#111111"}}>What's your email?</h1></big></big>

      <br></br>
      {/* separator */}
        <div class="separator1">
            <svg class="separator__svg1" width="100%" height="400" viewBox="0 0 100 100" preserveAspectRatio="none" fill="#44A36F" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M 100 100 V 10 L 0 100"/>
                <path d="M 30 73 L 100 18 V 10 Z" fill="#308355" stroke-width="0"/>
            </svg>
            
        </div>
      {/* end-separator */}
      <br></br><br></br><br></br><br></br>
    <div className="mtitle">
      <label style={{color: "#111111"}}>Email</label>
          <br></br>
          <input type="email" id="email" name="email" placeholder="Your email" 
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              style={{width: 500, height: 50, fontSize: 20, backgroundColor: "#DDDDDD"}}
          />
          <br></br>
        <button className="btn1" onClick={this.onClickBR3}><span>Click to move on!</span></button>
        <button className="btn22" onClick={this.onClickHome}><span>Go Back to Home Page</span></button>
        </div>
        <div className="titleB2">
            <h3 style={{color: "#111111"}}>Business Registration</h3>
        </div>
    </div>
    

  );
}
}

export default BR2;
