import React       from 'react';

export default React.createClass({
	render() {
		return (
			<div className='footer'>
				<div className='tools'>
					<form className='upload-form'>
						<input className='upload' type='file' accept='image/*;capture=camera' />
					</form>
					<div className='tool send-img' title='发送图片'>
						<i className='icon-picture'></i>
					</div>
					<div className='tool heart' title='我的收藏'>
						<i className='icon-heart'></i>
					</div>
					<div className='heart-pics'>
						<div className='pics-box'></div>
					</div>
				</div>
				<section className='input' contentEditable='true'></section>
				<button className='send'>发送</button>
			</div>
		);
	}
});