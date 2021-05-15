import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Square from './Square';
import './index.css';
import { HexColorPicker } from 'react-colorful';

class Game extends Component {
	constructor(props) {
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.state = {
			on: [
				{
					posX: 7,
					posY: 8,
					direction: 0,
				},
				{
					posX: 7,
					posY: 7,
					direction: 0,
				},
			],
			red: [],
			direction: 0,
			disabled: true,
			score: 0,
			pressed: false,
			deleteTimeout: false,
			startTimeout: false,
		};
	}

	getRandomPos() {
		const e = [Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)];
		if (this.state.on.some(o => o.posX === e[0] && o.posY === e[1]))
			return this.getRandomPos();
		return e;
	}

	handleScoreChange() {
		this.setState(prevState => ({
			score: prevState.score + 1,
		}));
		if (
			!localStorage.getItem('score') ||
			localStorage.getItem('score') < this.state.score
		)
			localStorage.setItem('score', this.state.score);
	}

	addPos(x, y) {
		if (x === -1 || x === 15 || y === -1 || y === 15) {
			return this.disable();
		}
		if (this.state.red[0] === x && this.state.red[1] === y) {
			this.handleScoreChange();
			return this.addPosFromOppDirection();
		}
		if (this.includes(x, y)) return this.disable();
		if (this.state.disabled === true) return;
		this.setState(prevState => ({
			on: [
				...prevState.on,
				{ posX: x, posY: y, direction: this.state.direction },
			],
		}));
	}

	addOpPos(x, y) {
		if (x === -1 || x === 15 || y === -1 || y === 15) {
			return this.disable();
		}
		this.setState({
			red: this.getRandomPos(),
		});
		this.setState(prevState => ({
			on: [
				{ posX: x, posY: y, direction: this.state.direction },
				...prevState.on,
			],
		}));
		this.addPosFromDirection();
	}

	includes(x, y) {
		if (this.state.on.some(e => e.posX === x && e.posY === y)) {
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
				return new Error('There is no direction in the state');
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
				return new Error('There is no direction in the state');
		}
	}

	removeOldestPos() {
		if (this.state.disabled === true) return;
		this.setState(prevState => ({
			on: [...prevState.on.slice(1)],
		}));
	}

	changeDirection(e) {
		this.setState(prevState => ({
			direction: (prevState.direction + e) % 4,
		}));
	}

	handleKeyDown(e) {
		// if (this.state.disabled === true) return;

		if (e.keyCode === 32) {
			if (this.state.pressed === true) return;
			e.preventDefault();
			if (this.state.disabled === false) {
				return this.setState({
					pressed: true,
					deleteTimeout: true,
				});
			}
		}
		switch (e.keyCode) {
			case 37:
			case 38:
			case 39:
			case 40:
				e.preventDefault();
			// ignoring warning about not having 'break', it's on purpose :)
			// eslint-disable-next-line
			case 65:
			case 87:
			case 68:
			case 83:
			case 32:
				if (this.state.pressed === true) {
					return;
				}
				this.setState({ pressed: true });
				if (this.state.disabled === true) this.setState({ startTimeout: true });
				break;
			default:
				break;
		}
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
		this.setState({
			red: this.getRandomPos(),
		});
		setTimeout(() => this.timeout(), 200);
		document.documentElement.style.setProperty(
			'--snake-color',
			localStorage.getItem('snake-color')
				? localStorage.getItem('snake-color')
				: '#000000'
		);
		document.addEventListener('keydown', this.handleKeyDown);
	}

	timeout() {
		if (this.state.disabled === true && this.state.startTimeout === false)
			return setTimeout(() => this.timeout(), 200);
		if (this.state.startTimeout === true || this.state.deleteTimeout === true)
			return this.restart();
		this.addPosFromDirection();
		this.removeOldestPos();
		this.setState({ pressed: false });
		const time = 200 - this.state.score * 2;
		setTimeout(() => this.timeout(), time >= 100 ? time : 100);
	}

	restart() {
		this.setState(
			{
				on: [
					{
						posX: 7,
						posY: 8,
						direction: 0,
					},
					{
						posX: 7,
						posY: 7,
						direction: 0,
					},
				],
				red: this.getRandomPos(),
				direction: 0,
				disabled: false,
				score: 0,
				deleteTimeout: false,
				startTimeout: false,
			},
			async () => this.timeout()
		);
	}

	handleColorChange(color) {
		document.documentElement.style.setProperty('--snake-color', color);
		localStorage.setItem('snake-color', color);
	}

	render() {
		const items = [];
		for (let i = 0; i < 15; i++) {
			for (let e = 0; e < 15; e++) {
				items.push(
					<Square posX={e} posY={i} on={this.state.on} red={this.state.red} key={`${i}_${e}`} />
				);
			}
		}
		return (
			<div>
				<div className="game">
					Score: {this.state.score}
					<br />
					High Score: {localStorage.getItem('score') || this.state.score}
					<div className="layout">
						<div className="game-board">{items}</div>
						<button
							type="button"
							className={
								this.state.disabled === true ? 'text-block1' : 'text-block'
							}
							onClick={() => this.setState({ startTimeout: true })}
						>
							<p>You died</p>
							<p className="smaller-text">Click to respawn</p>
						</button>
					</div>
				</div>
				<HexColorPicker
					className="picker"
					color={document.documentElement.style.getPropertyValue(
						'--snake-color'
					)}
					onChange={this.handleColorChange}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Game />, document.getElementById('root'));
