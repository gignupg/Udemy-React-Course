import React from 'react';
import ReactDOM from 'react-dom';

function ExtraInfo(props) {
  return (
    <p>{props.boiling()}</p>
  );
}
  

function TemperatureField(props) {
  return (
    <fieldset>
      <legend>Temperature in {props.scale === "c" ? "Celsius" : "Fahrenheit"}:</legend>
      <input value={props.converter()} onChange={(e) => props.onChange(e.target.value, props.scale)} />
    </fieldset>
  );
}

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: "",
      scale: "c"
    };
  }

  stateUpdater = (elem, scale) => {
    if (!/\d+/.test(elem)) {
      this.setState({ temperature: "" });
    } else {
      this.setState({ temperature: elem, scale: scale });
    }
  };

  celsius = () => {
    if (this.state.temperature === "") {
      return "";
    } else if (this.state.scale === "c") {
      return this.state.temperature;
    } else {
      return Math.round((this.state.temperature - 32) * 5 / 9 * 10 / 10);
    }
  };

  fahrenheit = () => {
    if (this.state.temperature === "") {
      return "";
    } else if (this.state.scale === "f") {
      return this.state.temperature;
    } else {
      return Math.round(((this.state.temperature * 9 / 5) + 32) * 10 / 10);
    }
  };

  boiling = () => {
    if (this.state.scale === "c") {
      return this.state.temperature >= 100 ? "The water is boiling :D" : "The water is still too cold!";
    } else {
      return this.state.temperature >= 212 ? "The water is boiling :D" : "The water is still too cold!";
    }
  };

  render() {
    return (
      <div>
        <h2>Temperature Converter</h2>
        <TemperatureField converter={this.celsius} onChange={this.stateUpdater} scale="c" />
        <TemperatureField converter={this.fahrenheit} onChange={this.stateUpdater} scale="f" />
        {this.state.temperature !== "" && <ExtraInfo boiling={this.boiling} />}
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <CurrencyConverter />
  </React.StrictMode>,
  document.getElementById('root')
);