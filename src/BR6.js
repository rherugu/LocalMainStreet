
import React from 'react';
import logo from './logo.svg';
import Component from "@reactions/component";
import Coves_Bold from './coves-typeface/Coves_Bold.otf';
import './BR6.css'
import 'react-tabs/style/react-tabs.css';
import "react-awesome-button/dist/styles.css";
import { Button, Divider, Form, Grid, Segment, Menu, Dropdown } from 'semantic-ui-react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Shop from './Shop';


class BR6 extends Component{

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
onClickBR4 = () =>{
    this.props.history.push("/BR4")
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
    const options = [
        { key: 1, text: 'Credit Card or Debit Card', value: 1 },
        { key: 2, text: 'Google Pay', value: 2 },
        { key: 3, text: 'Apple Pay', value: 3 },
        { key: 3, text: 'Samsung Pay', value: 3 },
        { key: 3, text: 'PayPal', value: 3 },
      ]
  return (
    <div className="B3Login">
        
      {/* <header className="BLogin-header"> */}
      
      {/* </header> */}
      <div>
        <h3 style={{color: "#111111"}}>Business Registration</h3>
      </div>
      <br></br><br></br><br></br>
      <big><big><h1 className="mtitle" style={{color: "#111111"}}>Select a payment option</h1></big></big>

      <br></br>
      {/* separator */}
        <div class="separator2">
            <svg class="separator__svg2" width="100%" height="400" viewBox="0 0 100 100" preserveAspectRatio="none" fill="#44A36F" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M 100 100 V 10 L 0 100"/>
                <path d="M 30 73 L 100 18 V 10 Z" fill="#308355" stroke-width="0"/>
            </svg>
            
        </div>
      {/* end-separator */}
      <br></br><br></br><br></br><br></br>
    <div className="mtitle">
    <label style={{color: "#111111"}}>Business Name</label>
          <br></br>
          <select id="paymentsystem"
            style={{width: 500, height: 50, fontSize: 20, backgroundColor: "#DDDDDD"}}
          >
            <option value="Credit Card/Debit Card">Credit Card/Debit Card</option>
            <option value="Google Pay">Google Pay</option>
            <option value="Samsung Pay">Samsung Pay</option>
            <option value="Apple Pay">Apple Pay</option>
            <option value="Paypal">Paypal</option>
          </select>
          <br></br>
        <button className="btn2"><span>One more Step!</span></button>
        <button className="btn22" onClick={this.onClickHome}><span>Go Back to Home Page</span></button>
        </div>
        <div className="titleB3">
            <h3 style={{color: "#111111"}}>Business Registration</h3>
        </div>
    </div>
    

  );
}
}

export default BR6;
