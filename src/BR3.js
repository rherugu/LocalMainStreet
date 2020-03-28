
import React from 'react';
import logo from './logo.svg';
import './Home.css';
import Component from "@reactions/component";
import Coves_Bold from './coves-typeface/Coves_Bold.otf';
import './BR3.css'
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


class BR3 extends Component{

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

  return (
    <div className="B3Login">
      {/* <header className="BLogin-header"> */}
      
      {/* <form>
          <label style={{color: "#111111"}}>First Name</label>
          <br></br>
          <input type="text" id="fname" name="firstname" placeholder="Your name.." 
              value={this.state.fname}
              onChange={e => this.setState({ fname: e.target.value })}
              style={{width: 500, height: 50, fontSize: 20, backgroundColor: "#DDDDDD"}}
          />
          <br></br>
          <label style={{color: "#111111"}}>Last Name</label>
          <br></br>
          <input type="text" id="lname" name="lastname" placeholder="Your last name.." 
              value={this.state.lname}
              onChange={e => this.setState({ lname: e.target.value })}
              style={{width: 500, height: 50, fontSize: 20, backgroundColor: "#DDDDDD"}}
          />
          <br></br>

          <label style={{color: "#111111"}}>Email</label>
          <br></br>
          <input type="email" id="email" name="email" placeholder="Your email" 
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              style={{width: 500, height: 50, fontSize: 20, backgroundColor: "#DDDDDD"}}
          />
          <br></br>
          <label style={{color: "#111111"}}>Business Name</label>
          <br></br>
          <input type="text" id="bname" name="bname" placeholder="The name of your business" 
              value={this.state.bname}
              onChange={e => this.setState({ bname: e.target.value })}
              style={{width: 500, height: 50, fontSize: 20, backgroundColor: "#DDDDDD"}}
          />
          <br></br>

          <label style={{color: "#111111"}}>Say something about your business</label>
          <br></br>
          <textarea rows="16" cols="160" id="description" name="description" placeholder="This will be shown for the consumer to see"
              onChange={e => this.setState({ message: e.target.value })}
              value={this.state.message}
              style={{width: 500, height: 50, fontSize: 20, backgroundColor: "#DDDDDD"}}
          ></textarea>
          <br></br>

          <label style={{color: "#111111"}}>Address</label>
          <br></br>
          <input type="text" id="Address" name="Address" placeholder="Your address" 
              value={this.state.Address}
              onChange={e => this.setState({ Address: e.target.value })}
              style={{width: 500, height: 50, fontSize: 20, backgroundColor: "#DDDDDD"}}
          />
          <br></br>
          <label style={{color: "#111111"}}>Phone Number</label>
          <br></br>
          <input type="text" id="PhoneNumber" name="PhoneNumber" placeholder="Your Phone No." 
              value={this.state.PhoneNumber}
              onChange={e => this.setState({ PhoneNumber: e.target.value })}
              style={{width: 500, height: 50, fontSize: 20, backgroundColor: "#DDDDDD"}}
          />
          <br></br>
          <label style={{color: "#111111"}}>Choose payment system</label>
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
          <input type="submit" value="Submit" onClick={e => this.handleFormSubmit(e)} />
        </form> */}
      {/* </header> */}
      <div>
        <h3 style={{color: "#111111"}}>Business Registration</h3>
      </div>
      <br></br><br></br><br></br>
      <big><big><h1 className="mtitle" style={{color: "#111111"}}>Whats the name of your business?</h1></big></big>

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
          <input type="text" id="bname" name="bname" placeholder="The name of your business" 
              value={this.state.bname}
              onChange={e => this.setState({ bname: e.target.value })}
              style={{width: 500, height: 50, fontSize: 20, backgroundColor: "#DDDDDD"}}
          />
          <br></br>
          <button className="btn2" onClick={this.onClickBR4}><span>Next</span></button>
        <button className="btn22" onClick={this.onClickHome}><span>Go Back to Home Page</span></button>
        </div>
        <div className="titleB3">
            <h3 style={{color: "#111111"}}>Business Registration</h3>
        </div>
    </div>
    

  );
}
}

export default BR3;
