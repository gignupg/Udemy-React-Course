import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function SingleSquare(props) {
  return (
    <button className="box" onClick={props.stateUpdater}>{props.display}</button>
  );
}

class AllSquares extends React.Component {

  boxCreator(i) {
    const state = this.props.state;
    return <SingleSquare display={state.history[state.length][i]} stateUpdater={() => this.props.stateUpdater(i)} />;
  }

  render() {
    let status;
    if (this.props.winner()) {
      status = "Winner: " + this.props.winner();
    } else {
      status = "Next player: " + (this.props.state.length % 2 === 0 ? "X" : "O");
    }

    return (
      <div id="playingField">
        <p id="status">{status}</p>
        <div className="row">
          {this.boxCreator(0)}
          {this.boxCreator(1)}
          {this.boxCreator(2)}
        </div>
        <div className="row">
          {this.boxCreator(3)}
          {this.boxCreator(4)}
          {this.boxCreator(5)}
        </div>
        <div className="row">
          {this.boxCreator(6)}
          {this.boxCreator(7)}
          {this.boxCreator(8)}
        </div>
      </div>
    );
  }
}

class TickTackToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [Array(9).fill(null)],
      xTurn: true,
      length: 0
    };
  }
  stateUpdater(i) {
    const historyArr = this.state.history.slice(0, this.state.length + 1);
    const newHistoryArr = historyArr[historyArr.length - 1].slice();

    if (!this.winner() && !newHistoryArr[i]) {
      newHistoryArr[i] = this.state.length % 2 === 0 ? "X" : "O";
      this.setState({
        history: historyArr.concat([newHistoryArr]),
        xTurn: this.state.history.length % 2 === 0,
        length: this.state.length + 1
      });
    }
  }

  winner() {
    const history = this.state.history;
    const arr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    const squares = history[this.state.length];
    for (let i = 0; i < arr.length; i++) {
      const [a, b, c] = arr[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    const historyMenu = this.state.history.map((elem, ix) => {
      return (
        <li key={ix}>
          <button onClick={() => this.setState({ length: ix })}>Step: {ix}</button>
        </li>
      );
    });

    return (
      <div id="everything">
        <AllSquares state={this.state} stateUpdater={i => this.stateUpdater(i)} winner={() => this.winner()} />
        <div id="history">History
          <ol>{historyMenu}</ol>
        </div>

      </div>
    );
  }
}

ReactDOM.render(<TickTackToe />, document.querySelector("#root"));