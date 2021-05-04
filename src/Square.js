import React, { Component } from 'react';

export default class Square extends Component {
	render() {
		let e = this.props.on.find(
			o => o.posX === this.props.posX && o.posY === this.props.posY
		);
		if (e) {
			e = e.direction;
		} else {
			e = undefined;
		}
		return (
			<div
				className={`${
					this.props.red[0] === this.props.posX &&
					this.props.red[1] === this.props.posY
						? 'red'
						: e
						? ''
						: 'box'
				} ${e === 0 || e === 2 ? 'dark-north' : ''} ${
					e === 1 || e === 3 ? 'dark-east' : ''
				}`}
				onClick={this.props.onClick}
			></div>
		);
	}
}
