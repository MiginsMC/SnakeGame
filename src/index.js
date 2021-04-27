import React, { Component } from "react";
import ReactDOM from "react-dom";
import Square from "./Square";
import "./index.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      on: [
        {
          posX: 4,
          posY: 5,
          direction: 0,
        },
        {
          posX: 4,
          posY: 4,
          direction: 0,
        },
      ],
      red: [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)],
      direction: 0,
      disabled: false,
      score: 0,
    };
  }

  handleScoreChange() {
    this.setState((prevState) => ({
      score: prevState.score + 1,
    }));
    if (
      !localStorage.getItem("score") ||
      localStorage.getItem("score") < this.state.score
    )
      localStorage.setItem("score", this.state.score);
  }

  addPos(x, y) {
    if (x === -1 || x === 9 || y === -1 || y === 9) {
      return this.disable();
    }
    if (this.state.red[0] === x && this.state.red[1] === y) {
      this.handleScoreChange();
      return this.addPosFromOppDirection();
    }
    if (this.includes(x, y)) return this.disable();
    if (this.state.disabled === true) return;
    this.setState((prevState) => ({
      on: [
        ...prevState.on,
        { posX: x, posY: y, direction: this.state.direction },
      ],
    }));
  }

  addOpPos(x, y) {
    if (x === -1 || x === 9 || y === -1 || y === 9) {
      return this.disable();
    }
    this.setState({
      red: [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)],
    });
    this.setState((prevState) => ({
      on: [
        { posX: x, posY: y, direction: this.state.direction },
        ...prevState.on,
      ],
    }));
    this.addPosFromDirection();
  }

  includes(x, y) {
    if (this.state.on.some((e) => e.posX === x && e.posY === y)) {
      return true;
    }
  }

  disable() {
    this.setState({
      disabled: true,
    });
  }

  addPosFromDirection() {
    const x = this.state.on[this.state.on.length - 1];
    switch (this.state.direction) {
      case 0:
        this.addPos(x.posX, x.posY - 1);
        break;
      case 1:
        this.addPos(x.posX + 1, x.posY);
        break;
      case 2:
        this.addPos(x.posX, x.posY + 1);
        break;
      case 3:
        this.addPos(x.posX - 1, x.posY);
        break;
      default:
        return new Error("There is no direction in the state");
    }
  }

  addPosFromOppDirection() {
    const x = this.state.on[0];
    switch (x.direction) {
      case 0:
        this.addOpPos(x.posX, x.posY + 1);
        break;
      case 1:
        this.addOpPos(x.posX - 1, x.posY);
        break;
      case 2:
        this.addOpPos(x.posX, x.posY - 1);
        break;
      case 3:
        this.addOpPos(x.posX + 1, x.posY);
        break;
      default:
        return new Error("There is no direction in the state");
    }
  }

  removeOldestPos() {
    if (this.state.disabled === true) return;
    this.setState((prevState) => ({
      on: [...prevState.on.slice(1)],
    }));
  }

  changeDirection(e) {
    this.setState((prevState) => ({
      direction: (prevState.direction + e) % 4,
    }));
  }

  handleKeyDown(e) {
    // if (this.state.disabled === true) return;
    switch (e.keyCode) {
      case 37: // left / a
      case 65:
        if (this.state.direction === 0 || this.state.direction === 2)
          this.changeDirection(this.state.direction === 0 ? 3 : 1);
        break;
      case 38: // up / w
      case 87:
        if (this.state.direction === 3 || this.state.direction === 1)
          this.changeDirection(this.state.direction === 3 ? 1 : 3);
        break;
      case 39: // right / d
      case 68:
        if (this.state.direction === 0 || this.state.direction === 2)
          this.changeDirection(this.state.direction === 0 ? 1 : 3);
        break;
      case 40: // down / s
      case 83:
        if (this.state.direction === 3 || this.state.direction === 1)
          this.changeDirection(this.state.direction === 3 ? 3 : 1);
        break;
      default:
        return;
    }
  }

  componentDidMount() {
    setTimeout(() => this.timeout(), 100);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  timeout() {
    if (this.state.disabled === true) return;
    this.addPosFromDirection();
    this.removeOldestPos();
    setTimeout(() => this.timeout(), 175);
  }

  restart() {
    console.log("restarting")
    if (this.disabled === false) return;
    console.log(this.state);
    this.setState({
      on: [
        {
          posX: 4,
          posY: 5,
          direction: 0,
        },
        {
          posX: 4,
          posY: 4,
          direction: 0,
        },
      ],
      red: [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)],
      direction: 0,
      disabled: false,
      score: 0,
    }, () => this.timeout());
  }

  render() {
    const items = [];
    for (let i = 0; i < 9; i++) {
      for (let e = 0; e < 9; e++) {
        items.push(
          <Square posX={e} posY={i} on={this.state.on} red={this.state.red} />
        );
      }
    }
    return (
      <div className="game">
        Score: {this.state.score}
        <br />
        High Score: {localStorage.getItem("score") || this.state.score}
        <div className="layout">
          <div className="game-board">{items}</div>
          <button type="button"
            className={
              this.state.disabled === true ? "text-block1" : "text-block"
            }
            onClick={ () => this.restart()}
          >
            <p>You died L</p>
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
