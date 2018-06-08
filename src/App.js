import React, { Component } from 'react';
import logo from './logo.svg';
import { ChromePicker } from 'react-color';
import './App.css';


class App extends Component {
  state = {
    background: '#000',
    hidePicker: true,
  };
  componentDidMount() {
      const rColor = this.randomColor();
      this.setState({background: rColor});
      window.addEventListener("keypress", this.myScript);
  }
  myScript = (e) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
      const rColor = this.randomColor();
      this.setState({background: rColor});
    }
  }
  invertColor = (hex) => {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) > 128
        ? '#000000'
        : '#FFFFFF';
    }
    randomColor(){
        return '#'+'0123456789abcdef'.split('').map((v,i,a) =>{
                return i>5 ? null : a[Math.floor(Math.random()*16)]
            }).join('');
    }
  handleChangeComplete = (color) => {
      this.setState({ background: color.hex });
  };
  render() {
    const color = this.invertColor(this.state.background);

    return (
      <div className="App" style={{backgroundColor: this.state.background}}>
          <div style={{color: color}}>YOUR FONT COLOR SHOULD BE <br/>{(color === '#000000') ? 'BLACK' : 'WHITE'}</div>
          <div className="color-picker">
               <input type="text" value={this.state.background} className="color-input" style={{color: color}}></input>
              {
                !this.state.hidePicker &&
                      <ChromePicker
                        color={ this.state.background }
                        onChangeComplete={ this.handleChangeComplete } />
              }
          </div>
      </div>
    );
  }
}

export default App;
