import React, { Component } from 'react';

export default class Square extends Component {
	render() {
		return (
			<div
				className={
					this.props.on.some(
						o => o.posX === this.props.posX && o.posY === this.props.posY
					)
						? 'dark'
						: this.props.red[0] === this.props.posX &&
						  this.props.red[1] === this.props.posY
						? 'red'
						: 'box'
				}
				onClick={this.props.onClick}
			></div>
		);
	}
}
