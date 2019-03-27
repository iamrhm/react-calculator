import React from "react";
import ReactDOM from "react-dom";
import DisplayPanel from './components/DisplayPanel'
import NumPad from './components/NumPad'
import { numPadInputs, numPadNumbers } from './config/env.const'

import './index.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentValue: '0',
      activeOperator: '',
      savedValue: '0'
    }
  }

  addNumbers = (value) => {
    let { currentValue, activeOperator, savedValue } = this.state;
    let firstDigitPosition = currentValue.charAt(0) === '-' ? 1 : 0;
    if (activeOperator !== '' && savedValue === '0') {
      savedValue = `${currentValue}`
      currentValue = '0'
    }
    if ((value === '.' && currentValue.indexOf('.') === -1) || value !== '.') {
      currentValue = `${currentValue}${value}`
    }
    if (currentValue.charAt(firstDigitPosition) === '0' && currentValue.charAt(firstDigitPosition + 1) !== '.' && value !== '.') {
      currentValue = currentValue.substring(0, firstDigitPosition) + currentValue.substring(firstDigitPosition + 1, currentValue.length);
    }
    if (currentValue.length < 11) {
      this.setState({
        currentValue: currentValue,
        savedValue: savedValue
      });
    }
  }

  clearValue = () => {
    if (this.state.currentValue === '0') {
      this.setState({
        currentValue: '0',
        savedValue: '0',
        activeOperator: ''
      });
    } else {
      this.setState({
        currentValue: '0'
      });
    }
  }

  changeSign = () => {
    let currentValue = this.state.currentValue;
    let currentSign = currentValue.charAt(0)
    if (currentSign !== '-') {
      currentValue = `-${currentValue}`
    } else {
      currentValue = currentValue.slice(1)
    }
    this.setState({
      currentValue: currentValue
    });
  }

  percentageOperation = () => {
    let currentValue = this.state.currentValue;
    currentValue = parseFloat(currentValue) / 100;
    this.setState({
      currentValue: `${currentValue}`
    });
  }

  saveOperator = operator => {
    const { activeOperator, savedValue } = this.state;
    if (activeOperator !== '') {
      this.executeOperation();
    }
    this.setState({
      activeOperator: operator,
      savedValue: '0'
    });
  }

  executeOperation = () => {
    let { activeOperator, currentValue, savedValue } = this.state;
    let result;
    if (activeOperator === '+') {
      result = parseFloat(savedValue) + parseFloat(currentValue);
    } else if (activeOperator === '-') {
      result = parseFloat(savedValue) - parseFloat(currentValue);
    } else if (activeOperator === 'x') {
      result = parseFloat(savedValue) * parseFloat(currentValue);
    } else if (activeOperator === '÷') {
      if (parseFloat(currentValue) !== 0 || parseFloat(currentValue) !== -0) {
        result = parseFloat(savedValue) / parseFloat(currentValue);
      } else {
        result = '0';
      }
    }
    if (typeof result === 'number' && result.toString().length > 11) {
      result = result.toFixed(9);
    }
    this.setState({
      currentValue: `${result}`,
      activeOperator: ''
    });
  }

  onClickHandler = (event) => {
    let value = event.target.value
    if (numPadNumbers.indexOf(value) > -1) {
      this.addNumbers(value);
    }
    if (value === 'AC' || value === 'C') {
      this.clearValue()
    }
    if (value === '+/-') {
      this.changeSign()
    }
    if (value === '%') {
      this.percentageOperation()
    }
    if (value === '+' || value === '-' || value === 'x' || value === '÷') {
      this.saveOperator(value)
    }
    if (value === '=') {
      this.executeOperation();
    }
  }

  render() {
    return (
      <div className='calculator'>
        <DisplayPanel>
          {this.state.currentValue}
        </DisplayPanel>
        <NumPad
          value={this.state.currentValue}
          items={numPadInputs}
          onClick={this.onClickHandler}
          activeOperator={this.state.activeOperator}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));