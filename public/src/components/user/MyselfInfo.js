import React from 'react';

export default React.createClass({
	render() {
		const { defaultHead, myself } = this.props;
		const { nickname, head } = myself;

		return (
			<div className='myself-info'>
				<div className='info'>
					<img className='head' src={head || defaultHead} />
					<span className='name'>{nickname}</span>
				</div>
			</div>
		);
	}
});