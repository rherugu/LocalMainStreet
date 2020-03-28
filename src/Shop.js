import React from 'react';
import logo from './logo.svg';
import { Button, Image, Tab, TabNavigation, Pane, Tablist, SidebarTab, 
Paragraph, TextInput } from 'evergreen-ui';
import './Shop.css';

import Component from "@reactions/component";

class Shop extends Component{
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
    onClickLogin = () =>{
        this.props.history.push("/login")
      }
render(){
return (
    <div className="Shop">
      <header className="Shop-header">
        <div className="logoimgS">
        <img src={require('./Assets/LOGObg.png')}></img>
        </div>
        <div className="tabs">

        <button class="btn" onClick= { this.onClickHome }
        ><span>Home</span></button>
        <br></br>
        <button class="btn" onClick= { this.onClickShop }><span>Shop</span></button>
        <br></br>
        <button class="btn" onClick= { this.onClickAbout }><span>About</span></button>
        <br></br>
        <button class="btn" onClick= { this.onClickContact }><span>Contact</span></button>
        <br></br>
        <button class="btn" id=".dropbtn" onClick= { this.onClickLogin }><span>Login</span></button>
        </div>
      </header>
      
    </div>
  );
}
}

export default Shop;
